const jwt = require("jsonwebtoken");
const User = require("../Modal/user");

exports.Driver = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET || "yourSecretKey"
    );
    const user = await User.findById(decoded?.id);
    console.log(user);
    if (!decoded) {
      return res.status(403).json({ message: "Your are not authorize" });
    }
    if (user && user?.role !== "DRIVER") {
      return res.status(400).json({ message: "Sorry your are not driver" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.mechanics = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET || "yourSecretKey"
    );
    const user = await User.findById(decoded?.id);
    if (!decoded) {
      return res.status(403).json({ message: "Your are not authorize" });
    }
    if (user && user?.role !== "MECHANICS") {
      return res.status(400).json({ message: "Sorry your are not mechanics" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.Admin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET || "yourSecretKey"
    );
    const user = await User.findById(decoded?.id);
    if (!decoded) {
      return res.status(403).json({ message: "Your are not authorize" });
    }
    if (user && user?.role !== "ADMIN") {
      return res.status(400).json({ message: "Sorry your are not admin" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
