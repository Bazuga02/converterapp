require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;
