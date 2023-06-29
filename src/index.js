const express = require("express");
const cors = require("cors");
require("./connection/sqlite");

const accountRoutes = require("./routes/accountRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const dataHandlerRoutes = require("./routes/dataHandlerRoutes");
const dataHandler = require("./middleware/dataHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 5050;

//healthCheck route
app.get("/health", (req, res) => {
  res.status(200).send({ success: true, message: "Service is Running" });
});

//accounts routes
app.use("/accounts", accountRoutes);

//destination routes
app.use("/destinations", destinationRoutes);

//dataHandler route
app.use("/server", dataHandler, dataHandlerRoutes);

app.use(errorHandler); //error handler

//Server listening to the port
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
