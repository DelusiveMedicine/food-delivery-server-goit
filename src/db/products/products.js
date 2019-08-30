const fs = require("fs");
const path = require("path");
const {Router} = require('express');
const router = Router();
const allProducts = require("./all-products");

router.param('id', (req, res, next, id) => {
  let productsListResponse;
  const arrayOfQueries = id.trim().split(",");
  const searchedProducts = arrayOfQueries.filter(item => {
    for (product of allProducts) {
      if (item == product.id) {
        return product;
      }
    }
  });

  if (searchedProducts.length) {
    productsListResponse = {
      "status": "success",
      "products": searchedProducts,
    }
  } else {
    productsListResponse = {
      "status": "no products",
      "products": [],
    }
  }

  res.status(200).send(productsListResponse);
  next();
});

router.get('/products/:id', (req, res) => {
  res.end();
});

router.get('/products' || '/products/', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const filePath = path.join(__dirname, "all-products.json");
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res).status(200);
});

module.exports = router;
