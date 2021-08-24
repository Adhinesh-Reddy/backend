const express = require("express");
const {
  addKpi4_5,
  getkpi4_5,
  editKpi4_5,
  getKpi4_51,
  deleteKpi4_5,
} = require("../controller/kpi4_5Controller");
const { protect } = require("../middlewares/authMiddleware");

const kpi4_5router = express.Router();

kpi4_5router.route("/kpi4_5").post(protect, addKpi4_5);
kpi4_5router.route("/kpi4_5").get(protect, getkpi4_5);
kpi4_5router.route("/kpi4_5/:id").get(protect, getKpi4_51);
kpi4_5router.route("/kpi4_5/:id").put(protect, editKpi4_5);
kpi4_5router.route("/kpi4_5/:id").delete(protect, deleteKpi4_5);
module.exports = kpi4_5router;
