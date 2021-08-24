const mongoose = require("mongoose");

const kpiSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    form: {
      type: String,
      required: true,
    },
    dataArrayValues: [{ type: String }],
    kpi4_5files: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Kpi = mongoose.model("kpisave", kpiSchema);

module.exports = Kpi;
