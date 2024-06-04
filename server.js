const Connection = require("./Config/DBConnect");
const app = require("./Config/expressConfig");
const http = require("http");
const PORT = process.env.PORT || 6000;

// Establish database connection
Connection();

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
