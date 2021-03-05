require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoute");
connectDB();

const app = express();

app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API Running");
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
