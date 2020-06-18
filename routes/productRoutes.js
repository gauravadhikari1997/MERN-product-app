const mongoose = require("mongoose");
const Product = mongoose.model("products");

module.exports = (app) => {
  app.get(`/api/product`, async (req, res) => {
    let products = await Product.find();
    return res.status(200).send(products);
  });

  app.get(`/api/product/:id`, async (req, res) => {
    const { id } = req.params;
    let _id = id;
    let product = await Product.find({ _id });
    return res.status(200).send({
      error: false,
      product,
    });
  });

  app.post(`/api/product`, async (req, res) => {
    let product = await Product.create(req.body);
    return res.status(200).send({
      error: false,
      product,
    });
  });

  app.put(`/api/product/:id`, async (req, res) => {
    const { id } = req.params;
    let _id = id;
    let product = await Product.updateOne({ _id }, req.body);

    return res.status(200).send({
      error: false,
      product,
    });
  });

  app.delete(`/api/product/:id`, async (req, res) => {
    const { id } = req.params;
    let _id = id;
    let product = await Product.deleteOne({ _id });

    return res.status(200).send({
      error: false,
      product,
    });
  });
};
