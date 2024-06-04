const jwt = require("jsonwebtoken");
const { sendEmail } = require("../Middlewares/EmailHandle");
const User = require("../Modal/Users");
const Workshop = require("../Modal/Workshop");

const register = async (req, res) => {
  try {
    let { profile, truckPhoto, idProof, driverLicence } = req.body;
    const user = await User.findOne({ email: req.body.email });
    const { password, cnfPassword } = req.body;
    if (req.files) {
      if (req.files.idProof) {
        idProof = "/idProof/" + req?.files?.idProof[0]?.originalname;
      }
      if (req?.files?.truckPhoto) {
        truckPhoto = "/truckPhoto/" + req?.files?.truckPhoto[0]?.originalname;
      }
      if (req?.files?.driverLicence) {
        driverLicence =
          "/driverLicence/" + req?.files?.driverLicence[0]?.originalname;
      }
      if (req?.files?.profile) {
        profile = "/profile/" + req?.files?.profile[0]?.originalname;
      }
    }
    req.body.idProof = idProof;
    req.body.truckPhoto = truckPhoto;
    req.body.profile = profile;
    req.body.driverLicence = driverLicence;
    if (user) {
      return res
        .status(401)
        .json({ message: "This username already exist please login" });
    }
    if (password !== cnfPassword) {
      return res.status(401).json({ message: "password not matched" });
    }
    const { isEnable, ...other } = req.body;
    if (req.body.role !== "ADMIN") {
      req.body = other;
    }
    const newUser = await new User(req.body).save();
    if (req.body.role === "MECHANICS") {
      const workshop = await Workshop.findById(req.body.workshop);
      workshop.mechanics.push(newUser?._id);
      await workshop.save();
    }
    res.status(201).json("your account successfully created");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const enableUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      res.status(404).json({ message: "user Id invalid" });
    }
    user.isEnable = true;
    user.save();
    res.status(200).json("user approved ");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const disableUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      res.status(404).json({ message: "user Id invalid" });
    }
    user.isEnable = false;
    user.save();
    res.status(200).json("user disabled successfully ");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user Id invalid" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted successfully ");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "sorry your account not present" });
    }
    const otp = await generateOTP();
    const otpEmail = `<p>please do not share this one time password its your responsible OTP: <strong>${otp}</strong> </p> `;
    user.otp.otp = otp;
    console.log(user);
    user.save();

    await sendEmail(otpEmail, user.email, "noreply your OTP");
    res.status(200).json("OTP has been sent, check your email");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      "otp.otp": req.body.otp,
    });
    console.log(req.body, user);
    if (!user) {
      return res.status(404).json({ message: "wrong otp" });
    }
    user.otp.isotp = true;
    await user.save();
    res.status(200).json("otp verify successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { password, cnfPassword } = req.body;
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user.otp.isotp !== true) {
      res.status(403).json({ message: "sorry you otp not varified" });
      return;
    }
    if (password !== cnfPassword) {
      res.status(401).json({ message: "password mismatch" });
      return;
    }
    user.password = password;
    user.otp.otp = "";
    user.otp.isotp = false;
    await user.save();
    res.status(200).json("password update successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
function generateOTP() {
  // Generate a random 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Your account not exist please sign up" });
    }
    const isMatched = await user.comparedPassword(req.body.password);
    if (!isMatched) {
      return res.status(403).json({ message: "Invalid password" });
    }
    if (!user.isEnable) {
      return res
        .status(401)
        .json({ message: "Please wait/contact for approve your account" });
    }

    const token = jwt.sign({ id: user._id }, "yourSecretKey", {
      expiresIn: "3h",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit || 99999);
    const total = await User.countDocuments();

    res
      .status(200)
      .json({ total, page, totalPages: Math.ceil(total / limit), users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    let { role } = req.params;
    role = role.toUpperCase();
    console.log("Requested role:", role);
    if (!["ADMIN", "DRIVER", "MECHANICS", "FIELDER"].includes(role)) {
      console.log("Invalid role specified");
      return res.status(400).json({ message: "Invalid role specified" });
    }
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.files) {
      req.body.profile = "/profile/pic/" + req?.files[0]?.originalname;
    }

    console.log(req.body);
    const updatedData = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedData);
    res.status(200).json("User update successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
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
  User,
};
