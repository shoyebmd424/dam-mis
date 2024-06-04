const approveVerification = require("../Middlewares/ApproveVerification");
const VerifyUser = require("../Middlewares/VerifyUser");
const AuthRoutes = require("./AuthRoutes");
const ExpenditureRoutes = require("./ExpendituresRoutes");
const FieldRoutes = require("./FieldRoutes");
const MaterialRoutes = require("./MaterialRoutes");
const partsRoutes = require("./PartRoutes");
const RepairRoutes = require("./RepairRoutes");
const TransportRoutes = require("./TransportRoutes");
const workshopRoutes = require("./WorkshopRoutes");

const Router = require("express").Router();

Router.use("/auth", AuthRoutes);
// Router.use("/appointment", VerifyUser, approveVerification, RepairRoutes);
Router.use("/appointment", RepairRoutes);
Router.use("/workshop", workshopRoutes);
Router.use("/parts", VerifyUser, approveVerification, partsRoutes);
Router.use("/transport", VerifyUser, approveVerification, TransportRoutes);
Router.use("/field", VerifyUser, FieldRoutes);
Router.use("/material", VerifyUser, MaterialRoutes);
Router.use("/expenditure", VerifyUser, ExpenditureRoutes);

module.exports = Router;
