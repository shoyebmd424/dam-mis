const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    stockType: {
      type: String,
      required: true,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Material = mongoose.model("material", userSchema);
module.exports = Material;
