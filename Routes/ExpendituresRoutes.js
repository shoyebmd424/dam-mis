const {
  createExpenditure,
  updateExpenditure,
  deleteExpenditure,
  getAllExpenditures,
  getExpenditureById,
  getExpenditureByFields,
} = require("../Controller/ExpenditureController");

const ExpenditureRoutes = require("express").Router();

ExpenditureRoutes.post("/", createExpenditure);
ExpenditureRoutes.put("/:id", updateExpenditure);
ExpenditureRoutes.delete("/:id", deleteExpenditure);
ExpenditureRoutes.get("/:id", getExpenditureById);
ExpenditureRoutes.get("/", getAllExpenditures);
ExpenditureRoutes.get("/fields/:fieldId", getExpenditureByFields);

module.exports = ExpenditureRoutes;
