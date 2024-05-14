import jwt from "jsonwebtoken";

// Takes the access_token cookie stored within the request and verifies validity
// Stops api call if the token is not present of if it is invalid
const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) {
      console.log("Authentication failed", err);
      return res.status(403).json("Token is not valid!");
    }
    req.userInfo = userInfo; // Attach userinfo to the request
    next(); // Call next middleware if token is present
  });
};

export default authenticateToken;
