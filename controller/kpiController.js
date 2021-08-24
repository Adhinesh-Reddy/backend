const express = require("express");
const Kpi = require("../models/kpiModel");
const KpiSubmit = require("../models/kpiSubmitModel");
const multer = require("multer");
const kpiController = express.Router();
const fs = require("fs");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

kpiController.post("/add1", upload.single("kpi4_5file1"), async (req, res) => {
  const { email, name, data, form } = req.body;
  let kpi4_5files = [];
  const url = req.protocol + "://" + req.get("host");
  let kpi4_5file = url + "/images/" + req.file.filename;
  kpi4_5files.push(kpi4_5file);
  let dataArrayValues = JSON.parse(data);

  const dataBackend = Kpi.create({
    email,
    name,
    form,
    dataArrayValues,
    kpi4_5files,
  });

  let id = "";
  let promise = Promise.resolve(dataBackend);
  promise.then(function (resolve, reject) {
    id = resolve._id;
    if (id) {
      res.status(201).json({
        _id: id,
      });
    } else {
      res.status(400);
      throw new Error("Error Occured");
    }
  });
});

let addEndpoints = [
  {
    endpoint: "/add2",
    nameOfFile: "kpi4_5file2",
  },
  {
    endpoint: "/add3",
    nameOfFile: "kpi4_5file3",
  },
  {
    endpoint: "/add4",
    nameOfFile: "kpi4_5file4",
  },
];

addEndpoints.forEach(function (i) {
  kpiController.post(
    i.endpoint,
    upload.single(i.nameOfFile),
    async (req, res) => {
      const { _id } = req.body;
      const data = await Kpi.findById(_id);
      const url = req.protocol + "://" + req.get("host");
      let kpi4_5file = url + "/images/" + req.file.filename;
      data.kpi4_5files.push(kpi4_5file);
      const updatedData = data.save();
      if (updatedData) {
        res.status(201).json({
          _id: _id,
        });
      } else {
        res.status(400);
        throw new Error("Error Occured");
      }
    }
  );
});

kpiController.post("/save", async (req, res) => {
  const { email, name, form, data } = req.body;
  let dataArrayValues = JSON.parse(data);
  const savedData = Kpi.create({
    email: email,
    name: name,
    form: form,
    dataArrayValues: dataArrayValues,
  });
});

kpiController.post("/submit", async (req, res) => {
  const { id, email, name, form, data, condition } = req.body;
  // console.log(data);

  // console.log(dataFileName);
  if (condition) {
    let dataArrayValues = JSON.parse(data);
    const submitData = KpiSubmit.create({
      email: email,
      name: name,
      form: form,
      dataArrayValues: dataArrayValues,
    });
    await Kpi.deleteOne({ _id: id });
  } else {
    const dataById = await Kpi.findById(id);
    const submitData = KpiSubmit.create({
      email: dataById.email,
      name: dataById.name,
      form: dataById.form,
      dataArrayValues: dataById.dataArrayValues,
      kpi4_5files: dataById.kpi4_5files,
    });
    await Kpi.deleteOne({ _id: id });
  }
});

kpiController.get("/data/:id", async (req, res) => {
  let data = await Kpi.findById(req.params.id);

  if (data) {
    res.status(201).json(data);
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const editEndPoints = [
  {
    endpoint: "/edit1",
    nameOfFile: "kpi4_5file1",
  },
  {
    endpoint: "/edit2",
    nameOfFile: "kpi4_5file2",
  },
  {
    endpoint: "/edit3",
    nameOfFile: "kpi4_5file3",
  },
  {
    endpoint: "/edit4",
    nameOfFile: "kpi4_5file4",
  },
];

editEndPoints.forEach(function (i, index) {
  kpiController.put(
    `${i.endpoint}/:id`,
    upload.single(i.nameOfFile),
    async (req, res) => {
      let data = await Kpi.findById(req.params.id);
      const url = req.protocol + "://" + req.get("host");
      let kpi4_5file = url + "/images/" + req.file.filename;
      data.name = "Adhinesh Reddy";
      let files = [];
      for (let j = 0; j < 4; j++) {
        if (j == index) {
          const filepath = `./images/${data.kpi4_5files[j].replace(
            `${url}/images/`,
            ""
          )}`;
          files.push(kpi4_5file);
          fs.unlinkSync(filepath);
        } else {
          files.push(data.kpi4_5files[j]);
        }
      }
      data.kpi4_5files = files;
      const updatedData = await data.save();
      if (updatedData) {
        res.status(201).json(updatedData);
      } else {
        res.status(400);
        throw new Error("Error Occured");
      }
    }
  );
});

kpiController.put("/edit/:id", async (req, res) => {
  const { email, name, form, data } = req.body;
  console.log(req.params.id);
  const dataArrayValues = JSON.parse(data);
  let dataById = await Kpi.findById(req.params.id);

  dataById.name = name || dataById.name;
  dataById.email = email || dataById.email;
  dataById.form = form || dataById.form;
  dataById.dataArrayValues = dataArrayValues || dataById.dataArrayValues;

  const updatedData = await dataById.save();
});

kpiController.get("/hod/data/:email", async (req, res) => {
  const email = req.params.email;
  let data = [];
  var cursor = await KpiSubmit.find({ email });
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

kpiController.get("/hod/showdata/:id", async (req, res) => {
  let data = await KpiSubmit.findById(req.params.id);
  // console.log(req.params.id);
  // console.log(data);

  if (data) {
    res.status(201).json(data);
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

module.exports = kpiController;
