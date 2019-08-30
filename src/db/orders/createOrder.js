const fs = require("fs");
const path = require("path");
const {Router} = require('express');
const router = Router();
const allProducts = require("../products/all-products");

router.post('/orders/' || '/orders', (req, res, next) => {
    const orderData = req.body;
    const orderProducts = orderData.products;
    const productsOrdered = orderProducts.every(itemId => {
        for (product of allProducts) {
          if (product.id == itemId) {
            return true;
          }
        }
      });
      if (productsOrdered.length) {
        const filePath = path.join(__dirname, "all-orders.json");
        let allOrders;
        fs.readFile(filePath, 'utf8', (err, data) => {
          allOrders = JSON.parse(data);
          let i = allOrders.length + 1;
          orderData.id = i;
          allOrders.push(orderData);
      
          fs.writeFileSync(filePath, JSON.stringify(allOrders), 'utf8', err => console.log(err));
          
          if (err) throw err;
          res.status(200).send({
            "status": "success",
            "order": orderData,
          });
        });        
      } else {
        res.status(200).send({'status': 'failed', 'order': null});
      }
      
})

module.exports = router;