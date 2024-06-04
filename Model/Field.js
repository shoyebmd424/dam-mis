const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    maintainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Field = mongoose.model("field", userSchema);
module.exports = Field;
