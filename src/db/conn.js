const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.DBURL);
    console.log("database conected!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;
