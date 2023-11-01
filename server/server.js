//jshint esversion:6
const path = require("path");
const express = require("express");
const cors = require("cors");
const db = require("./database/db");

//Routes
const lessonRoutes = require("./routes/lessonRoutes");

const PORT = process.env.PORT || 4000;

//database
db();
//Setting of app
const app = express();
//port = 4000;
require("dotenv").config({ path: ".env" });
//essential for cross origin single line is perfect but we have to extra when it comes to production
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://storied-yeot-f64820.netlify.app/",
    "https://campus-connect-five.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json({ name: "rahul" });
});
//Routing of different api endpoint using router
//Here we are using mvc pattern in the backend
app.use("/api/lessons", lessonRoutes);

app.listen(PORT, () => {
  console.log(` is running on http://localhost:${PORT}`);
});
