const Parts = require("../Modal/Parts");
const Workshop = require("../Modal/Workshop");

exports.Createparts = async (req, res) => {
  try {
    const parts = new Parts(req.body);
    const workshop = await Workshop.findById(req.body.workshopId);
    if (!workshop) {
      res.status(404).json({ message: "sorry your workshop id invalid" });
      return;
    }
    workshop.parts.push(parts?._id);
    await parts.save();
    await workshop.save();
    res.status(201).json("parts added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updatepartsById = async (req, res) => {
  try {
    const parts = await Parts.findById(req.params.id);
    if (!parts) {
      res.status(404).json({ message: "invalid partsing id" });
      return;
    }
    await Parts.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json("Detail updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteparts = async (req, res) => {
  try {
    const parts = await Parts.findById(req.params.id);
    if (!parts) {
      res.status(404).json({ message: "invalid parts id" });
      return;
    }
    await Parts.findByIdAndDelete(req.params.id);
    res.status(201).json("Detail deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getById = async (req, res) => {
  try {
    const parts = await Parts.findById(req.params.id);
    if (!parts) {
      res.status(404).json({ message: "invalid parts id" });
      return;
    }
    res.status(201).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllparts = async (req, res) => {
  try {
    const parts = await Parts.find();
    res.status(201).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllpartsByWorkshopId = async (req, res) => {
  try {
    const parts = await Parts.find({ workshopId: req.params.workshopId });
    res.status(201).json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
