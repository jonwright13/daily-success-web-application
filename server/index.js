import express from "express";
import postRoutes from "./features/posts/routes/posts.js";
import authRoutes from "./features/auth/routes.js";
import userRoutes from "./features/user/route.js";
import moodRoutes from "./features/posts/routes/mood.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import authenticateToken from "./features/auth/middleware/authenticateToken.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", authenticateToken, postRoutes);
app.use("/api/moods", authenticateToken, moodRoutes);
app.use("/api/user", authenticateToken, userRoutes);

app.listen(8800, () => {
  console.log("Connected!!");
});
