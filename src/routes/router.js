const main = require('./main/main')
const productsRouting = require('./products/productsRouting');
const signUp = require('./users/createUser');

const router = {
  '/signup': signUp,
  '/products': productsRouting,
  '/products/': productsRouting,
  default: main
};

module.exports = router;