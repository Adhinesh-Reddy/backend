const express = require("express");
const kpi6GetController = express.Router();

kpi6GetController.get("/", (req, res) => {
  let dataArray = [
    {
      name: "Name of eligible supervisor",
      value: "",
    },
    {
      name: "Name of the PhD candidate",
      value: "",
    },
    {
      name: "Date of Enrollement",
      value: "",
    },
    {
      name: "Link of Enrollement Letter",
      value: "",
    },
  ];

  let dataFileName = [];

  res.json({
    dataArray: dataArray,
    dataFileName: dataFileName,
  });
});

module.exports = kpi6GetController;
