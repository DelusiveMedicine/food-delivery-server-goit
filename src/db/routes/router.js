const main = require('../main/main')
const products = require('../products/products');
const signUp = require('../users/createUser');

const router = {
  '/signup': signUp,
  '/products': products,
  default: main
};

module.exports = router;