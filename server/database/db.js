const mongoose = require("mongoose");
require("dotenv").config();

//variable for the mongodb cluster database that is stored in .env file
const uri = process.env.mongodb_uri;

const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://rahulkr705018:Rahul%402001@languagelearningapp.yudeewo.mongodb.net/Language_Learning_database?retryWrites=true&w=majority", {
      useNewUrlParser: true, // No longer needed in modern Mongoose
  useUnifiedTopology: true, 
      
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Gracefully close the database connection on application termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection to MongoDB closed");
  process.exit(0);
});

module.exports = db;
