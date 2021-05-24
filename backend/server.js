const dotenv = require("dotenv");
const express = require("express");
const configExpress = require("./config/express");
const configMongoosePusher = require("./config/mongoose");
const routes = require("./routes");

//Config
dotenv.config({path: "./.env"});
const port = process.env.PORT || 9000;

const app = express();
configExpress(app);
configMongoosePusher(app);

//Routes
app.use(routes);

//Listen
app.listen(port, () => console.log(`Server listening on port ${port}...`));
