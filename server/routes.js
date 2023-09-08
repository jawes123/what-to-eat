const express = require("express");
const {User, Recipe} = require("./models");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/add_user", async (request, response) => {
    const newUser = new User({
        name: request.body.name,
        age: request.body.age
     });
  
    try {
      await newUser.save();
      response.send(newUser);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await userModel.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  module.exports = app;