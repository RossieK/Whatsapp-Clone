const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "./.env"});
const app = express();
const port = process.env.PORT || 9000;

//MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function callback() {
  console.log("DB connected...");
});

//Routes
app.get("/", (req, res) => {
  res.status(200).send("hello");
});

//Listen
app.listen(port, () => console.log(`Server listening on port ${port}...`));
