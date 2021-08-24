const kpi4_5GetController = require("../controller/kpi4_5GetController");
const kpi6GetController = require("../controller/kpi6GetController");
const kpiController = require("../controller/kpiController");

const kpi4_5RoutesNew = (app) => {
  let getEndpoints = [
    {
      endPoint: "/kpi4_5",
      controller: kpi4_5GetController,
    },
    {
      endPoint: "/kpi6",
      controller: kpi6GetController,
    },
  ];

  app.use("/kpi", kpiController);

  getEndpoints.forEach(function (data) {
    app.use(data.endPoint, data.controller);
  });
};

module.exports = kpi4_5RoutesNew;
