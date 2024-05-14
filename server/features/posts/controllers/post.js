import knexInstance from "../../../utils/knexInstance.js";

// GET MOODS ASSOCIATED WITH SINGLE POST
export const getMoodsWithPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userInfo.id;

  try {
    const result = await knexInstance("posts as p")
      .select("p.id", "p.title", "p.content", "p.created")
      .select(knexInstance.raw("COALESCE(GROUP_CONCAT(m.name), '') AS moods"))
      .leftJoin("posts_moods as pm", "p.id", "pm.pid")
      .leftJoin("moods as m", "pm.mid", "m.id")
      .where("p.id", postId)
      .andWhere("p.uid", userId)
      .groupBy("p.id");

    console.log(
      "Successfully retrieves moods associated with post",
      postId,
      result
    );
    return res.status(200).json(result);
  } catch (err) {
    console.log("Connection errer", err);
    return res.status(500).json("Connection error");
  }
};

export const getPostCountWithData = async (req, res) => {
  const date = req.params.date;
  const userId = req.userInfo.id;

  try {
    const count = await knexInstance("posts")
      .select("created")
      .where("uid", userId)
      .whereRaw("DATE(created) = ?", [date])
      .then((rows) => rows.length);
    console.log("count", count);
    return res.status(200).json(count);
  } catch (err) {
    console.log("Connection errer", err);
    return res.status(500).json("Connection error");
  }
};

// GET ALL POSTS WITH / WITHOUT MOOD
export const getPosts = async (req, res) => {
  console.log("getPosts");
  const mood = req.query.mood;
  const userInfo = req.userInfo;

  try {
    const postsQuery = knexInstance("posts")
      .select("*")
      .where("uid", userInfo.id)
      .orderBy("created", "desc");

    if (mood) {
      postsQuery.whereExists(function () {
        this.select(knexInstance.raw(1))
          .from("posts_moods")
          .whereRaw("posts_moods.pid = posts.id")
          .whereIn("posts_moods.mid", function () {
            this.select("id").from("moods").where("name", "like", `%${mood}%`);
          });
      });
    }

    const posts = await postsQuery;

    // Array to store promises for fetching mood information for each post
    const moodPromises = posts.map(async (post) => {
      // Fetch mood ids (mid) for the current post from posts_moods table
      const moodIds = await knexInstance("posts_moods")
        .select("mid")
        .where("pid", post.id)
        .pluck("mid");

      // Fetch mood information (name and color) for each mood id (mid)
      const moodInfoPromises = moodIds.map(async (moodId) => {
        const mood = await knexInstance("moods")
          .select("name", "color")
          .where("id", moodId)
          .first(); // Assuming mood id is unique

        return { name: mood.name, color: mood.color };
      });

      // Wait for all mood information promises to resolve
      const moods = await Promise.all(moodInfoPromises);

      // Return the post with mood information
      return { ...post, moods };
    });

    // Wait for all post mood promises to resolve
    const postsWithMoods = await Promise.all(moodPromises);
    console.log(
      "Successfully retried all posts for user",
      userInfo.id,
      "with mood",
      mood
    );
    return res.status(200).json(postsWithMoods);
  } catch (err) {
    console.log("Connection error");
    return res.status(500).json("Connection error");
  }
};

// GET SINGLE POST WITH POST ID
export const getPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await knexInstance
      .select(
        "p.id",
        "username",
        "title",
        "desc",
        "p.img",
        "u.img AS userImg",
        "cat",
        "date"
      )
      .from("users as u")
      .join("posts as p", "u.id", "=", "p.uid")
      .where("p.id", postId);

    console.log("Success geting post");
    console.log("getPost", data);
    return res.status(200).json(post[0]);
  } catch (err) {
    console.log("Error", err);
    return res.status(500).json("Error Getting Post");
  }
};

// ADD POST
export const addPost = (req, res) => {
  const { title, content, moods, created } = req.body;
  console.log("Add Post", req.body);

  const userId = req.userInfo.id;

  try {
    knexInstance.transaction(async (trx) => {
      try {
        // Retrieve mood IDs for the given mood names
        const moodIds = await trx("moods")
          .select("id")
          .whereIn(
            "name",
            moods.map((mood) => mood.name)
          )
          .then((rows) => rows.map((row) => row.id));

        // Insert the new post into the posts table
        const [postId] = await trx("posts").insert({
          title,
          content,
          created,
          uid: userId,
        });

        // Insert mood references into the posts_moods table
        await Promise.all(
          moodIds.map((moodId) =>
            trx("posts_moods").insert({ pid: postId, mid: moodId })
          )
        );

        // Commit the transaction
        await trx.commit();
        console.log("Succesfully created post");
        return res.json("Post has been created");
      } catch (error) {
        // Rollback the transaction if there are any errors
        await trx.rollback();
        console.log("Rollback due to error", error);
        throw error;
      }
    });
  } catch (error) {
    console.log("Connection error", error);
    return res.status(500).json(error);
  }
};

// DELETE POST WITH POST ID
export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await knexInstance.transaction(async (trx) => {
      await trx("posts").where("id", postId).del();

      console.log(`Post deleted. Id: ${postId}`);
      return res.status(200).json("Post deleted");
    });
  } catch (err) {
    return res.status(500).json("error deleting post");
  }
};

/** UPDATE POST
 *
 * Using a post id, verify that the user has the permissions to edit the post, the perform a
 * transaction using knex to update the post with matching id using the updated title and content,
 * and then update the posts_moods table with the new moods references (Deletes all first then
 * re-populates)
 * @param {object} req request with body containing title (Str), content (str), and moods (Array)
 * @param {object} res response
 * @returns {object} response object containing string success message
 */
export const updatePost = (req, res) => {
  const postId = req.params.id;
  const moodNames = req.body.moods.map((mood) => mood.name);
  console.log("Update Post", req.body);

  try {
    // Start a transaction
    knexInstance.transaction(async (trx) => {
      try {
        // Retrieve mood IDs for the given mood names
        const moodIds = await trx("moods")
          .select("id")
          .whereIn("name", moodNames)
          .then((rows) => rows.map((row) => row.id));

        // Update the posts table
        await trx("posts")
          .where({ id: postId })
          .update({ title: req.body.title, content: req.body.content });

        // Delete existing mood references for the post
        await trx("posts_moods").where({ pid: postId }).del();

        // Insert new mood references
        await Promise.all(
          moodIds.map((moodId) =>
            trx("posts_moods").insert({ pid: postId, mid: moodId })
          )
        );

        // Commit the transaction
        await trx.commit();
        console.log("Transaction committed successfully");
        return res.json("Post successfully updated");
      } catch (error) {
        // Rollback the transaction if there are any errors
        await trx.rollback();
        console.error("Transaction rolled back due to error:", error);
        throw error; // Re-throw the error to propagate it further
      }
    });
  } catch (error) {
    console.error("Error updating post with moods:", error);
    throw error; // Re-throw the error to propagate it further
  }
};
