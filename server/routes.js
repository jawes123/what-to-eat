const express = require("express");
const {User, Recipe} = require("./models");
const app = express();

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
    const users = await User.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  
app.post("/add_recipe", async (request, response) => {
    const newRecipe = new Recipe({
        name: request.body.name,
        description: request.body.description,
        ingredients: request.body.ingredients,
        recipe: request.body.recipe
     });
  
    try {
      await newRecipe.save();
      response.send(newRecipe);
    } catch (error) {
      response.status(500).send(error);
    }
  });
app.get("/recipes", async (request, response) => {
    const recipe = await Recipe.find({}).lean();
    try {
      response.send(JSON.stringify(recipe));
    } catch (error) {
      response.status(500).send(error);
    }
  });


  module.exports = app;