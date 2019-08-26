const main = require('./main/main')
const productsRouting = require('../db/products/productsRouting');
const signUp = require('../db/users/createUser');

const router = {
  '/signup': signUp,
  '/products': productsRouting,
  '/products/': productsRouting,
  default: main
};

module.exports = router;