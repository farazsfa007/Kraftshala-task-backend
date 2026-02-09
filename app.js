const express = require("express");
const cors = require("cors")
const userRoutes = require("./module/user/userRoutes");
const meetingRoutes = require("./module/meeting/meetingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

app.use(errorHandler);

module.exports = app;