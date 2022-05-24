const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorization = req.header("Authorization");
  const token = authorization ? authorization.replace("Bearer ", "") : null;

  if (!token) {
    return res.status(403).send("A token is required for auth");
  }
  try {
    const decoded = jwt.verify(token, "arquitectura2022");
    req.user = decoded;
  } catch(e) {
    return res.status(500).send("There was an error verifying the token");
  }
  return next();
}

module.exports = verifyToken;