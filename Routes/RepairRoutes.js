const {
  CreateRepairRequest,
  updateRepairById,
  deleteRepair,
  getById,
  getAllRepairs,
  getAllRepairRequests,
  assginRepairToMechanics,
  getAllAssignMechanics,
  acceptRequestByMechanics,
  repairComplete,
  getAllappointmentsByDriver,
  rejectRequest,
  getAllAppoinmentsByStatus,
  getAllappointmentsByDriverAndStatus,
} = require("../Controller/RepairController");
const { Driver, Admin, mechanics } = require("../Middlewares/VerifyRole");

const RepairRoutes = require("express").Router();
//  book appointment
RepairRoutes.post("/", Driver, CreateRepairRequest);
//  update appointment
RepairRoutes.put("/:id", updateRepairById);
RepairRoutes.delete("/:id", deleteRepair);
RepairRoutes.get("/:id", getById);
RepairRoutes.get("/driver/:driverId", getAllappointmentsByDriver);
// status
RepairRoutes.get(
  "/driver/status/:driverId/:status",
  getAllappointmentsByDriverAndStatus
);
RepairRoutes.get("/", getAllRepairs);
//give appointment to mechanics id
RepairRoutes.post("/requests/assign", Admin, assginRepairToMechanics);
//  get appointments to mechanics id
RepairRoutes.get("/requests/assign/:mechanicsId", getAllAssignMechanics);
RepairRoutes.get("/status/:mechanicsId/:status", getAllAppoinmentsByStatus);

//  accept appointment by mechanics
RepairRoutes.post("/requests/accept", mechanics, acceptRequestByMechanics);
//  reject appointment by mechanics
RepairRoutes.post("/requests/reject", mechanics, rejectRequest);
RepairRoutes.post("/complete/:id", mechanics, repairComplete);

module.exports = RepairRoutes;
