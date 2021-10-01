const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const router = express.Router();



// GET /api/products
router.get("/products", async (_request, response) => {
  try {
    const products = await logic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/productsByUnits", async (_request, response) => {
  try {
    const products = await logic.sortProductsByUnitsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});



router.post("/products", async (request, response) => {
  try {
    const product = request.body;
    const addedProduct = await logic.addProductAsync(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
