const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log(url);
  mongoose.set("strictQuery", false);

  mongoose
    .connect(url)
    .then(() => {
      console.log(`Mongodb connected`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
