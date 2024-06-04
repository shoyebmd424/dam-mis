const {
  register,
  login,
  getUsersByRole,
  getAllUsers,
  getUserById,
  updateUserDetails,
  enableUser,
  forgetPassword,
  verifyOtp,
  updatePassword,
  disableUser,
  deleteUser,
} = require("../Controller/AuthController");
const { Admin } = require("../Middlewares/VerifyRole");
const uploadFile = require("../Middlewares/uploadFile");
const uploadMuiltiFieldFiles = require("../Middlewares/uploadMultifieldFiles");
const AuthRoutes = require("express").Router();
AuthRoutes.post(
  "/register",
  uploadMuiltiFieldFiles("./Public/RegisterFiles"),
  register
);
AuthRoutes.post("/users/enable", Admin, enableUser);
AuthRoutes.post("/users/disable", Admin, disableUser);
AuthRoutes.delete("/users/:id", Admin, deleteUser);
AuthRoutes.post("/login", login);
AuthRoutes.put("/update/:id", updateUserDetails);
AuthRoutes.put(
  "/update/img/:id",
  uploadFile("./Public/Profile"),
  updateUserDetails
);
AuthRoutes.get("/users", getAllUsers);
AuthRoutes.get("/users/:id", getUserById);
AuthRoutes.get("/users/by/:role", getUsersByRole);

//  forget passsword
AuthRoutes.post("/users/forget", forgetPassword);
AuthRoutes.post("/users/verify", verifyOtp);
AuthRoutes.post("/users/update/password", updatePassword);

module.exports = AuthRoutes;
