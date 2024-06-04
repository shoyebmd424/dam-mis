const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    driverLicense: {
      type: String,
      required: true,
    },
    truckNumber: {
      type: String,
    },
    model: {
      type: String,
    },
    parts: [{ type: mongoose.Schema.Types.ObjectId, ref: "parts" }],
    description: String,
    location: String,
    timeSlot: String,
    extraBill: Number,
    totalBill: Number,
    paid: Number,
    workshop: { type: mongoose.Types.ObjectId, ref: "workshop" },
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Confirm", "Complete"],
    },
    repairRequest: {
      isAssign: {
        type: Boolean,
        default: false,
      },
      driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      mechanicsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    acceptRepairRequest: {
      isAccept: {
        type: Boolean,
        default: false,
      },
      reject: Array,
      mechanicsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    assignerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Repair = mongoose.model("Repair", RepairSchema);

module.exports = Repair;
