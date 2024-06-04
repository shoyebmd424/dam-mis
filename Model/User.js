const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // middlename: String,
    // lastname: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    otp: { isotp: { type: Boolean, default: false }, otp: String },
    workshopId: { type: mongoose.Schema.Types.ObjectId, ref: "workshop" },
    phone: String,

    truckNo: String,
    isEnable: {
      type: Boolean,
      default: false,
    },

    address: String,
    workshop: String,
    drivingLicience: String,
    profile: String,
    idProof: String,
    truckPhoto: String,
    busySlot: Array,
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "DRIVER", "MECHANICS", "FIELDER"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  next();
});

userSchema.methods.comparedPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// "email":"workshop2@gmail.com",
// "password":"12345",

// Mechanics
// "email":"dileho3424@cgbird.com",
// "password":"12345",

//  driver
// senipij356@fincainc.com
// Password :"12345"
