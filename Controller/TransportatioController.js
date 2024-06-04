const Transportation = require("../Modal/Transportation");

exports.Createtransport = async (req, res) => {
  try {
    const transport = new Transportation(req.body);
    await transport.save();
    res.status(201).json("your transport onloaded");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updatetransportById = async (req, res) => {
  try {
    const transport = await Transportation.findById(req.params.id);
    if (!transport) {
      res.status(404).json({ message: "invalid transport id" });
      return;
    }
    await Transportation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json("Detail updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deletetransport = async (req, res) => {
  try {
    const transport = await Transportation.findById(req.params.id);
    if (!transport) {
      res.status(404).json({ message: "invalid transporting id" });
      return;
    }
    await Transportation.findByIdAndDelete(req.params.id);
    res.status(201).json("Detail deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getById = async (req, res) => {
  try {
    const transport = await Transportation.findById(req.params.id);
    if (!transport) {
      res.status(404).json({ message: "invalid transporting id" });
      return;
    }
    res.status(201).json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAlltransports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const transports = await Transportation.find()
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Transportation.countDocuments();
    res
      .status(201)
      .json({ total, page, totalPages: Math.ceil(total / limit), transports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllTransportByUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const transports = await Transportation.find({ userId: req.params.userId })
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Transportation.countDocuments();
    res
      .status(200)
      .json({ total, page, totalPages: Math.ceil(total / limit), transports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllTransportByDriver = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const transports = await Transportation.find({
      assingTo: req.params.userId,
    })
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Transportation.countDocuments();
    res
      .status(200)
      .json({ total, page, totalPages: Math.ceil(total / limit), transports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllTransportByDriverAndStatus = async (req, res) => {
  try {
    console.log(req.params.status);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const transports = await Transportation.find({
      assingTo: req.params.userId,
      status: req.params.status,
    })
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Transportation.countDocuments();
    res
      .status(200)
      .json({ total, page, totalPages: Math.ceil(total / limit), transports });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.cancelTransport = async (req, res) => {
  try {
    const { reason, driverId } = req.body;
    const transports = await Transportation.findById(req.params.id);
    if (!transports) {
      return res.status(404).json({ message: "invalid transport id" });
    }
    transports.status = "cancelled";
    transports.cancel.push({ reason, driverId });
    await transports.save();
    res.status(200).json("cancelled task transportation");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.acceptTransport = async (req, res) => {
  try {
    const { longitude, latitude, driverId } = req.body;
    const transports = await Transportation.findById(req.params.id);
    if (!transports) {
      return res.status(404).json({ message: "invalid transport id" });
    }
    transports.status = "in transit";
    transports.accept.push({ driverId, locations: [longitude, latitude] });
    await transports.save();
    res.status(200).json("Accept task transportation");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.completeTransport = async (req, res) => {
  try {
    const transports = await Transportation.findById(req.params.id);
    if (!transports) {
      return res.status(404).json({ message: "invalid transport id" });
    }
    transports.status = "completed";
    await transports.save();
    res.status(200).json("Completed task transportation");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
