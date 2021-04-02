const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    })
app.use("/api", require("./app/routes/Route.User"));
app.use("/api", require("./app/routes/Route.Post"));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ernest application." });
  });
