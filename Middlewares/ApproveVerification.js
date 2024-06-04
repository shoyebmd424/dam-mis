const jwt = require("jsonwebtoken");
const { User } = require("../Controller/AuthController");
const approveVerification = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET || "yourSecretKey"
    );
    const user = await User.findById(decoded?.id);
    if (!decoded) {
      return res.status(403).json({ message: "Your are not authorize" });
    }
    if (user && !user?.isEnable) {
      return res
        .status(400)
        .json({ message: "Your account has been blocked/inactive" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = approveVerification;
