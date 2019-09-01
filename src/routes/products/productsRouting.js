const allProducts = require("../../db/products/all-products");
const products = require("./products");

const productsRouting = (request, response) => {
  let searchedProductList = {
    status: "",
    products: []
  };
  let searchedProducts = [];

  if (request.url.lastIndexOf("/") && request.url.includes("=")) {
    const lastIndex = request.url.lastIndexOf("=");
    const decodedURL = decodeURI(request.url).trim();
    const queryString = decodedURL.slice(lastIndex + 1);

    if (request.url.includes("?ids=")) {
      const arrayOfQueries = queryString.split(",");
      searchedProducts = allProducts.filter(product => {
        for (item of arrayOfQueries) {
          if (item == product.id) {
            return product;
          }
        }
      });
    } 
    
    if (request.url.includes("?categories=")) {
      searchedProducts = allProducts.filter(product => {
        for (category of product.categories) {
          if (category === queryString) {
            return product;
          }
        }
      });
    }
    
  } else if (request.url.lastIndexOf("/")) {
    searchedProducts = allProducts.find(product =>
      request.url.includes(product.id) ? product : null
    );
  } else {
    products(request, response);
    return;
  }
  if (searchedProducts && searchedProducts.length !== 0) {
    searchedProductList.status = "success";
    searchedProductList.products = searchedProducts;
    newProductList = JSON.stringify(searchedProductList);
  } else {
    searchedProductList.status = "no products";
    newProductList = JSON.stringify(searchedProductList);
  }

  response.writeHead(200, {
    "Content-Type": "application/json"
  });
  response.write(newProductList);
  response.end();
};

module.exports = productsRouting;
