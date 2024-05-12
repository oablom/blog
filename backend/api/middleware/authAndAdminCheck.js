function adminCheck(req, res, next) {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json("Error: Du har inte administratörsrättigheter.");
  }
  next();
}

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token Received:", token);

  if (!token) {
    return res.status(401).json({ message: "No token available." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token Verification Error:", err);
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { adminCheck, authenticate };
