const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kpi4_5Schema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    kpi4_5file1: {
      type: String,
    },
    kpi4_5file2: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("kpi4_5save1", kpi4_5Schema);
