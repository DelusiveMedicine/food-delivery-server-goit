const main = require('./main/main')
const products = require('../db/products/products');
const signUp = require('../db/users/createUser');

const router = {
  '/signup': signUp,
  '/products': products,
  default: main
};

module.exports = router;