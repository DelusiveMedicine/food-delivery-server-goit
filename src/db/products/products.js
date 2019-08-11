const fs = require('fs');
const path = require('path');

const products = (request, response) => {
  const filePath = path.join(__dirname, 'all-products.json');

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(response);
};

module.exports = products;