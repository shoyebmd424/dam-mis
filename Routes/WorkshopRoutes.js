const {
  Createworkshop,
  updateworkshopById,
  deleteworkshop,
  getAllworkshops,
  getById,
} = require("../Controller/WorkshopController");

const workshopRoutes = require("express").Router();

workshopRoutes.post("/", Createworkshop);
workshopRoutes.put("/:id", updateworkshopById);
workshopRoutes.delete("/:id", deleteworkshop);
workshopRoutes.get("/:id", getById);
workshopRoutes.get("/", getAllworkshops);

module.exports = workshopRoutes;
