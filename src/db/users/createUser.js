const fs = require("fs");

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
      fs.writeFile(__dirname + "/" + userFile, body, function(err) {
        if (err) throw err;
      });

      const createdUser = JSON.stringify({ status: "success", user: userData });
    
      response.writeHead(200, {
        "Content-Type": "application/json"
      });
      response.write(createdUser);
      response.end();
    });
  }
};

module.exports = signUp;
