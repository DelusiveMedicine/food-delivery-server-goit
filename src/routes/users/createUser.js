const fs = require("fs");
const path = require("path");

const signUp = (request, response) => {
  
  if (request.method === "POST") {
    let body = "";
    
    request.on("data", function(data) {
      body = body + data;
    });
    
    request.on("end", function() {
      const userData = JSON.parse(body);
      const userName = userData.username;
      const userFile = userName + ".json";
      const filePath = path.join("src", "db", "users");
      fs.writeFile(filePath + "/" + userFile, body, function(err) {
        if (err) throw err;
      });

      const createdUser = JSON.stringify({ status: "success", user: userData });
    
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.write(createdUser);
      response.end();
    });
  } else {
    response.writeHead(404);
    response.write('Page Not Found');
    response.end();
  }
};

module.exports = signUp;
