const express = require("express");
const kpi4_5GetController = express.Router();

kpi4_5GetController.get("/", (req, res) => {
  let dataArray = [
    {
      name: "Department",
      value: "",
    },
    {
      name: "Name Of The Activity",
      value: "",
    },
    {
      name: "Organising Unit/ Agency/ Collaborating agency",
      value: "",
    },
    {
      name: "Date of the activity",
      value: "",
    },
  ];

  let dataFileName = [
    {
      name: "kpi4_5file1",
    },
    {
      name: "kpi4_5file2",
    },
    {
      name: "kpi4_5file3",
    },
    {
      name: "kpi4_5file4",
    },
  ];

  res.json({
    dataArray: dataArray,
    dataFileName: dataFileName,
  });
});

module.exports = kpi4_5GetController;
