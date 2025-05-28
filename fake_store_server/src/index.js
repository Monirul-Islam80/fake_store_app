require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/users", require("./routes/users"));
app.use("/orders", require("./routes/orders"));
app.use("/cart", require("./routes/cart"));
app.use("/products", require("./routes/product"));

console.log(process.env.MONGO_URI);
app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.Alright..Giggity Giggity");
    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000/ ")
    );
  })
  .catch((err) => console.error("DB connection error:", err));
