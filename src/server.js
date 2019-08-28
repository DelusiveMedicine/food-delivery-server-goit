const https = require('https');
const url = require('url');
const fs = require('fs');

const httpOptions =  {
 
  key: fs.readFileSync("././cert/server.key"),
  
  cert: fs.readFileSync("././cert/server.crt")
 }

const morgan = require('morgan');
const router = require('./routes/router');

const logger = morgan('combined');

const handleRouting = require('./routes/handleRouting')

const startServer = port => {

  const server = https.createServer(httpOptions, (request, response) => {

    const parsedUrl = url.parse(request.url);

    const func = handleRouting(router, parsedUrl.pathname) || router.default;
    logger(request, response, () => func(request, response));
  });
  
  server.listen(port, () => console.log('Listening on port 3001'));
};

module.exports = startServer;