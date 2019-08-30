/* FOR HTTPS
const https = require('https');

const httpOptions =  {
 
  key: fs.readFileSync("./cert/server.key"),
  
  cert: fs.readFileSync("./cert/server.crt")
 }

https.createServer(app).listen(port, () => {console.log('Listening on port', port)}); 
*/

const express = require('express');
const app = express();
const corsMiddleware = require('cors');
const port = 3001;
const productsRoute = require('./src/db/products/products');
const createUser = require('./src/db/users/createUser');
const createOrder = require('./src/db/orders/createOrder');

app.use(express.json());
app.use(corsMiddleware());

app.get('/', (req, res) => {
    res.send('<h1>Hello!</h1>')
});

app.use(productsRoute);

app.use(createUser);

app.use(createOrder);

app.listen(port, () => {console.log('Listening on port', port)});