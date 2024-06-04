const {
  Createtransport,
  updatetransportById,
  deletetransport,
  getById,
  getAlltransports,
  getAllTransportByUser,
  getAllTransportByDriver,
  cancelTransport,
  acceptTransport,
  getAllTransportByDriverAndStatus,
  completeTransport,
} = require("../Controller/TransportatioController");

const TransportRoutes = require("express").Router();

TransportRoutes.post("/", Createtransport);
TransportRoutes.put("/:id", updatetransportById);
TransportRoutes.delete("/:id", deletetransport);
TransportRoutes.get("/:id", getById);
TransportRoutes.get("/", getAlltransports);
TransportRoutes.get("/user/:userId", getAllTransportByUser);
TransportRoutes.get("/driver/:userId", getAllTransportByDriver);
TransportRoutes.get(
  "/driver/status/:userId/:status",
  getAllTransportByDriverAndStatus
);
TransportRoutes.post("/reject/:id", cancelTransport);
TransportRoutes.post("/accept/:id", acceptTransport);
TransportRoutes.post("/complete/:id", completeTransport);

module.exports = TransportRoutes;
