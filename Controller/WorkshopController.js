const Workshop = require("../Model/Workshop");

exports.Createworkshop = async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).json("your workshop created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateworkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      res.status(404).json({ message: "invalid workshop id" });
      return;
    }
    await Workshop.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json("Detail updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteworkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      res.status(404).json({ message: "invalid workshoping id" });
      return;
    }
    await Workshop.findByIdAndDelete(req.params.id);
    res.status(201).json("Detail deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      res.status(404).json({ message: "invalid workshoping id" });
      return;
    }
    res.status(201).json(workshop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllworkshops = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const workshops = await Workshop.find()
      .skip((page - 1) * limit)
      .limit(limit || 9999);
    const total = await Workshop.countDocuments();

    res
      .status(201)
      .json({ total, page, totalPages: Math.ceil(total / limit), workshops });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
