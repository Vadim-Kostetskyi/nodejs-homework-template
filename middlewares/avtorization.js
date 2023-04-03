const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_PRIVATE_KEY);

    const userId = decoded._id;
    const user = await User.findById(userId);
    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = checkTokenMiddleware;
