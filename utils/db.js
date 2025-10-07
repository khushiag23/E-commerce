const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

const dbConnect = () => {
  mongoose.connect(dbUrl)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};
module.exports = dbConnect;

