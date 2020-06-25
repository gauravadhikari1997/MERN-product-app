const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

//import models
require("./models/Product");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost:27017/products-app`,
  {
    useNewUrlParser: true,
  }
);

app.use(bodyParser.json());

//import routes
require("./routes/productRoutes")(app);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});
