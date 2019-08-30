const fs = require("fs");
const path = require("path");
const { Router } = require('express');
const router = Router();
const allUsersFile = require('./all-users');

router.param('id', (req, res, next, id) => {
  let userDataResponse;
  const searchedUser = allUsersFile.find(user => {
    if (user.id == id) return user;
  });
  if (searchedUser) {
    userDataResponse = {
      "status": "success",
      "user": searchedUser
    }
  } else {
    userDataResponse = {
      "status": "not found"
    }
  }

  res.send(userDataResponse)
});

router.get('/users/:id', (req, res) => {
  console.log('Loading user info')
});

router.post('/users' || '/users/', (req, res) => {
  const userData = req.body;
  const filePath = path.join(__dirname, "all-users.json");
  fs.readFile(filePath, 'utf8', (err, data) => {
    const allUsers = JSON.parse(data);
    let i = allUsers.length + 1;
    userData.id = i;
    allUsers.push(userData);

    fs.writeFileSync(filePath, JSON.stringify(allUsers), 'utf8', err => console.log(err));

    const createdUser = JSON.stringify({
      status: "success",
      user: userData
    });
    res.send(createdUser);
    if (err) throw err;
  });
});

module.exports = router;