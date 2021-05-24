const router = require("express").Router();
const registerController = require("./controllers/registerController");
const loginController = require("./controllers/loginController");
const roomsController = require("./controllers/roomsController");
const messagesController = require("./controllers/messagesController");

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/rooms", roomsController);
router.use("/messages", messagesController);

module.exports = router;
