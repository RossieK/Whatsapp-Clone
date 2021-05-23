const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  room: {
    type: mongoose.Types.ObjectId,
    ref: "room",
  },
});

module.exports = mongoose.model("messageContent", messageSchema);
