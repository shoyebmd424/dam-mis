const {
  Createparts,
  updatepartsById,
  deleteparts,
  getById,
  getAllparts,
  getAllpartsByWorkshopId,
} = require("../Controller/PartsController");

const partsRoutes = require("express").Router();

partsRoutes.post("/", Createparts);
partsRoutes.put("/:id", updatepartsById);
partsRoutes.delete("/:id", deleteparts);
partsRoutes.get("/:id", getById);
partsRoutes.get("/", getAllparts);
partsRoutes.get("/workshop/:workshopId", getAllpartsByWorkshopId);

module.exports = partsRoutes;
