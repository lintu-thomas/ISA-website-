const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  
  // Remove "Bearer " prefix if it exists
  token = token.replace("Bearer ", "");

  // Static token verification
  if (token === "isa-admin-auth-token") {
    // Add a dummy admin object just in case any routes expect req.admin.id
    req.admin = { id: "static-admin-id" };
    next();
  } else {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
