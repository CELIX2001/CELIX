const express = require("express");
const Product = require("/absolute/path/to/models/product");
const router = express.Router();

router
  .get("/getProducts", async (req, res) => {
    try {
      const products = await Product.getAllProducts();
      res.send(products);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/addProduct", async (req, res) => {
    try {
      const product = await Product.addProduct(req.body);
      res.send({ ...product, Password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .put("/updateProduct", async (req, res) => {
    try {
      const product = await Product.updateProduct(req.body);
      res.send({ ...product, Password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .delete("/deleteProduct", async (req, res) => {
    try {
      await Product.deleteProduct(req.body);
      res.send({ success: "Product successfully deleted." });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

module.exports = router;
