const mongoose = require("mongoose");
const partschema = new mongoose.Schema({
  partName: {
    type: String,
    required: true,
  },
  model: String,
  partNumber: String,
  quantity: {
    type: Number,
    default: 0,
  },
  price: Number,
  workshopId: { type: mongoose.Types.ObjectId, ref: "workshop" },
});

const Parts = mongoose.model("parts", partschema);
module.exports = Parts;
