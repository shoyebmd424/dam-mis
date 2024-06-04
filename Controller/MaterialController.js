const Material = require("../Modal/Material");

exports.createMaterial = async (req, res) => {
  try {
    await new Material(req.body).save();
    res.status(201).json("Material create successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id);
    if (!material) {
      res.status(404).json({ message: "Invalid material id" });
      return;
    }
    res.status(200).json("Material update successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      res.status(404).json({ message: "Invalid Material id" });
      return;
    }
    res.status(200).json("Material delete successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      res.status(404).json({ message: "Invalid Material id" });
      return;
    }
    res.status(200).json(material);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAllMaterials = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const materials = await Material.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      materials,
      page,
      totalPages: Math.ceil(materials.length / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
