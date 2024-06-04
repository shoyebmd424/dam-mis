const mongoose = require("mongoose");
const workshopSchema = new mongoose.Schema({
  workshop: String,
  location: String,
  ownership: String,
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "parts" }],
  mechanics: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "appoinments" }],
});

const Workshop = mongoose.model("workshop", workshopSchema);
module.exports = Workshop;
