const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Pusher = require("pusher");
const cors = require("cors");
const Messages = require("./dbMessages.js");
const Rooms = require("./dbRooms");

//Config
dotenv.config({path: "./.env"});
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

//Middlewares
app.use(express.json());
app.use(cors());

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

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//Routes
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/rooms/sync", (req, res) => {
  Rooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/rooms/sync/:id", (req, res) => {
  Rooms.findOne({_id: req.params.id}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/rooms/new", (req, res) => {
  const dbRoom = req.body;

  Rooms.create(dbRoom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//Listen
app.listen(port, () => console.log(`Server listening on port ${port}...`));
