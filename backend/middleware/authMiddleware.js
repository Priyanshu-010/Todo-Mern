import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId); // ✅ not decoded.id

    // req.user = await User.findById(decoded.id).select("-password");
    console.log("Auth Header:", authHeader);
    console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
    // ✅ attaches user to req
    next();
  } catch (err) {
    console.log("Auth Middleware Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
