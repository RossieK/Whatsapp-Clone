const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  //Body parser
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  //CORS
  app.use(cors());
};
