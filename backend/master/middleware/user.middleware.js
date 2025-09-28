// middlewares/userMiddleware.js
import jwt from 'jsonwebtoken';

export async function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Token is required" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.userId = decoded.id;
    next();

  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ success: false, message: "Authentication failed" });
  }
}
