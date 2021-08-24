const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const kpi4_5Routes = require("./routes/kpi4_5Routes");
const kpi4_5RoutesNew = require("./routes/kpi4_5RoutesNew");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/kpi", kpi4_5Routes);
app.use("/images", express.static("images"));

// app.use("/api/kpinew", kpi4_5RoutesNew);
kpi4_5RoutesNew(app);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT: ${PORT}`));
