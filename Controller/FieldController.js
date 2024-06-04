const Field = require("../Modal/Field");

exports.createField = async (req, res) => {
  try {
    await new Field(req.body).save();
    res.status(201).json("field create successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateField = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    if (!field) {
      res.status(404).json({ message: "Invalid field id" });
      return;
    }
    await Field.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("field update successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.deleteField = async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);
    if (!field) {
      res.status(404).json({ message: "Invalid field id" });
      return;
    }
    res.status(200).json("field delete successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getFieldById = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    if (!field) {
      res.status(404).json({ message: "Invalid field id" });
      return;
    }
    res.status(200).json(field);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAllFields = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const fields = await Field.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Field.countDocuments();
    res
      .status(200)
      .json({ page, total, fields, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getFieldByOwners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const fields = await Field.find({ owner: req.params.ownerId })
      .skip((page - 1) * limit)
      .limit(limit);
    res
      .status(200)
      .json({ page, fields, totalPages: Math.ceil(fields?.length / limit) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getFieldByMatainer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const fields = await Field.find({ maintainer: req.params.maintainerId })
      .skip((page - 1) * limit)
      .limit(limit);
    res
      .status(200)
      .json({ page, fields, totalPages: Math.ceil(fields?.length / limit) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
