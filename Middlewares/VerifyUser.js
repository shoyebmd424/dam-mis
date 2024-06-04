const jwt = require("jsonwebtoken");
const VerifyUser = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET || "yourSecretKey"
    );
    // console.log(decoded);
    if (!decoded) {
      return res.status(403).json("Your are not authorize");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = VerifyUser;
