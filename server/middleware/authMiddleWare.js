const jwt = require("jsonwebtoken");

// Custom error class for structured error handling
class AuthError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AuthError";
  }
}

// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token or incorrect format");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id || !decoded.role) {
      throw new AuthError("Token payload is missing required fields.", 401);
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); // Proceed to next middleware/controller
  } catch (err) {
    console.error("Token error:", err.message);

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired." });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token." });
    }

    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({
      message: "Internal server error during token verification.",
      error: err.message,
    });
  }
};

module.exports = authenticateToken;
