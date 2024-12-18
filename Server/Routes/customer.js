const express = require("express");
const Customer = require("/absolute/path/to/models/customer");
const router = express.Router();

router
  .get("/getCustomers", async (req, res) => {
    try {
      const customers = await Customer.getAllCustomers();
      res.send(customers);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/login", async (req, res) => {
    try {
      const customer = await Customer.login(req.body);
      res.send({ ...customer, Password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/register", async (req, res) => {
    try {
      const customer = await Customer.register(req.body);
      res.send({ ...customer, Password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .put("/update", async (req, res) => {
    try {
      const customer = await Customer.updateEmail(req.body);
      res.send({ ...customer, Password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .delete("/delete", async (req, res) => {
    try {
      await Customer.deleteAccount(req.body);
      res.send({ success: "Account successfully deleted. We will miss you! :(" });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  });

module.exports = router;
