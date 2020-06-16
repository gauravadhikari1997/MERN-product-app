const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/products-app`
);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});
