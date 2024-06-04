const {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialById,
  getAllMaterials,
} = require("../Controller/MaterialController");

const MaterialRoutes = require("express").Router();

MaterialRoutes.post("/", createMaterial);
MaterialRoutes.put("/:id", updateMaterial);
MaterialRoutes.delete("/:id", deleteMaterial);
MaterialRoutes.get("/:id", getMaterialById);
MaterialRoutes.get("/", getAllMaterials);

module.exports = MaterialRoutes;
