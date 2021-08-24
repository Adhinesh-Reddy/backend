const asyncHandler = require("express-async-handler");
const Kpi4_5 = require("../models/kpiModel");
const multer = require("multer");
const uuidv4 = require("uuid");
const path = require("path");

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    console.log(file.originalname);
    cb(null, uuidv4 + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
}).single("kpi4_5file1");

const addKpi4_5 = asyncHandler(async (req, res) => {
  const {
    department,
    nameOfTheActivity,
    organisingUnit,
    dateOfTheActivity,
    email,
    // kpi4_5file1,
  } = req.body;

  const url = req.protocol + "://" + req.get("host");

  // let kpi4_5file1 = url + "/public/" + req.file.filename;
  let kpi4_5file1 = url + "/public/hello";
  console.log(req.file.path);

  const data = await Kpi4_5.create({
    email,
    department,
    nameOfTheActivity,
    organisingUnit,
    dateOfTheActivity,
    kpi4_5file1,
  });

  if (data) {
    res.status(201).json({
      _id: data._id,
      email: data.email,
      department: data.department,
      nameOfTheActivity: data.nameOfTheActivity,
      organisingUnit: data.organisingUnit,
      dateOfTheActivity: data.dateOfTheActivity,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const getkpi4_5 = asyncHandler(async (req, res) => {
  const email = "test@gmail.com";

  let data = [];

  var cursor = await Kpi4_5.find({ email });
  await cursor.forEach((doc) => {
    data.push(doc);
  });

  if (data) {
    res.status(201).json(data);
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const editKpi4_5 = asyncHandler(async (req, res) => {
  const { department, nameOfTheActivity, organisingUnit, dateOfTheActivity } =
    req.body;
  let kpi4_5 = await Kpi4_5.findById(req.params.id);

  try {
    kpi4_5.department = department || kpi4_5.department;
    kpi4_5.nameOfTheActivity = nameOfTheActivity || kpi4_5.nameOfTheActivity;
    kpi4_5.organisingUnit = organisingUnit || kpi4_5.organisingUnit;
    kpi4_5.dateOfTheActivity = dateOfTheActivity || kpi4_5.dateOfTheActivity;

    const kpi4_5update = await kpi4_5.save();

    res.json({
      _id: kpi4_5update._id,
      department: kpi4_5update.department,
      nameOfTheActivity: kpi4_5update.nameOfTheActivity,
      organisingUnit: kpi4_5update.organisingUnit,
      dateOfTheActivity: kpi4_5update.dateOfTheActivity,
    });
  } catch (error) {
    console.error(error);
  }
});

const getKpi4_51 = asyncHandler(async (req, res) => {
  let data = await Kpi4_5.findById(req.params.id);

  if (data) {
    res.status(201).json(data);
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const deleteKpi4_5 = asyncHandler(async (req, res) => {
  const kpi4_5 = await Kpi4_5.findById(req.params.id);
  const email = "test@gmail.com";

  if (kpi4_5) {
    await kpi4_5.remove();
    let data = [];

    var cursor = await Kpi4_5.find({ email });
    await cursor.forEach((doc) => {
      data.push(doc);
    });

    res.json(data);
  } else {
    res.status(404);
    throw new Error("Kpi not Found");
  }
});

module.exports = { addKpi4_5, getkpi4_5, editKpi4_5, getKpi4_51, deleteKpi4_5 };
