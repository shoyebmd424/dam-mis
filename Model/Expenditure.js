const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    workers: {
      type: String,
    },
    rolledCost: {
      type: String,
    },
    fuelCost: String,
    material: [{ type: mongoose.Schema.Types.ObjectId, ref: "material" }],
    maintainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: String,
    field: { type: mongoose.Schema.Types.ObjectId, ref: "field" },
  },
  { timestamps: true }
);

const Expenditure = mongoose.model("expenditure", userSchema);
module.exports = Expenditure;
