const Parts = require("../Modal/Parts");
const Repair = require("../Modal/Repairing");
const Workshop = require("../Modal/Workshop");
const User = require("../Modal/user");

exports.CreateRepairRequest = async (req, res) => {
  try {
    const { driverId } = req.body;

    const repair = new Repair(req.body);
    repair.repairRequest.driverId = driverId;
    repair.status = "Pending";
    const newAppoint = await repair.save();
    const workshop = await Workshop.findById(req.body.workshop);
    workshop?.appointments?.push(newAppoint?._id);
    await workshop.save();
    res.status(201).json("your request has been sent");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      res.status(404).json({ message: "invalid repairing id" });
      return;
    }
    await Repair.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json("Detail updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteRepair = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      res.status(404).json({ message: "invalid repairing id" });
      return;
    }
    await Repair.findByIdAndDelete(req.params.id);
    res.status(201).json("Detail deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      res.status(404).json({ message: "invalid repairing id" });
      return;
    }
    res.status(201).json(repair);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllappointmentsByDriver = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const repairs = await Repair.find({
      "repairRequest.driverId": req.params.driverId,
    })
      .skip((page - 1) * limit)
      .limit(limit || 99999);
    const total = await Repair.countDocuments();
    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      appointments: repairs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllappointmentsByDriverAndStatus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const repairs = await Repair.find({
      "repairRequest.driverId": req.params.driverId,
      status: req.params.status,
    })
      .skip((page - 1) * limit)
      .limit(limit || 99999);
    const total = await Repair.countDocuments();
    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      appointments: repairs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllRepairs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const repairs = await Repair.find()
      .skip((page - 1) * limit)
      .limit(limit || 9999);

    const total = await Repair.countDocuments();
    res.status(201).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      appointments: repairs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.assginRepairToMechanics = async (req, res) => {
  try {
    const repair = await Repair.findById(req.body.repairId);
    if (!repair) {
      res.status(404).json({ message: "Invalid repair id" });
      return;
    }
    repair.assignerId = req.body.assignerId;
    repair.repairRequest.isAssign = true;
    repair.repairRequest.mechanicsId = req.body.mechanicsId;
    repair.save();
    console.log(repair);
    res.status(200).json("Repair assign to the mechanics successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAllAssignMechanics = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // console.log(req.params.mechanicsId);
    const repairs = await Repair.find({
      "repairRequest.isAssign": true,
      "acceptRepairRequest.isAccept": false,
      "repairRequest.mechanicsId": req.params.mechanicsId,
    })
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Repair.countDocuments();

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      appointments: repairs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAllAppoinmentsByStatus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const repairs = await Repair.find({
      status: req.params.status,
      "repairRequest.mechanicsId": req.params.mechanicsId,
    })
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Repair.countDocuments();

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      appointments: repairs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.acceptRequestByMechanics = async (req, res) => {
  try {
    const repair = await Repair.findById(req.body.repairId);
    if (!repair) {
      res.status(404).json({ message: "Invalid repair id" });
      return;
    }
    const user = await User.findById(req.body.mechanicsId);
    if (!user) {
      res.status(404).json({ message: "invalid user" });
    }
    user.busySlot.push({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });
    repair.acceptRepairRequest.isAccept = true;
    repair.status = "Confirm";
    repair.acceptRepairRequest.mechanicsId = req.body.mechanicsId;

    await repair.save();
    await user.save();
    res.status(200).json("appointment accepted");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const { mechanicsId, reason, repairId } = req.body;
    console.log(req.body);
    if (!mechanicsId || !reason) {
      res.status(400).json({ message: "field empty" });
      return;
    }
    const repair = await Repair.findById(repairId);
    if (!repair) {
      res.status(404).json({ message: "Invalid repair id" });
      return;
    }
    repair.acceptRepairRequest.reject.push({ mechanicsId, reason });
    repair.status = "Cancelled";
    repair.save();
    res.status(200).json("Appoinment rejected");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.repairComplete = async (req, res) => {
  try {
    const { parts, total, extra, paid } = req.body;
    const repair = await Repair.findById(req.params.id);
    if (!repair) {
      res.status(404).json({ message: "invalid repair id" });
    }
    repair.parts = parts;
    repair.status = "Complete";
    for (const part of parts) {
      const prt = await Parts.findById(part);
      prt.quantity -= part.quantity || 1;
      await prt.save();
    }
    repair.totalBill = total;
    repair.extraBill = extra;
    repair.paid = paid;
    await repair.save();
    res.status(200).json("Your repairing done");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
