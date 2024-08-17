var jwt = require("jsonwebtoken");
const JWT_SECRET = "raviisgoodboy";

const fetchUser = (req, res, next) => {
  //get the user from jwt token and add id to jwt token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Plaease authticate a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Plaease authticate a valid token" });
  }
};
module.exports = fetchUser;
