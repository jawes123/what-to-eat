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
app.get("/users/:email", async (request, response) => {
    const usr = await User.find({email: request.params.email});
  
    try {
      response.send(usr);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  
app.post("/add_recipe", async (request, response) => {
    //if(request.body.email)
    fetch("http://localhost:3001/users")
    .then((res) => {return res.json()})
    .then((recipeJSONObject) => {
      setRecipeJSON(recipeJSONObject[0])})
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
app.get("/recipes/:email", async (request, response) => {
    const usr = await User.find({email: request.params.email});
    const recipes = usr[0].recipes
    try {
      console.log(recipes)
      response.send(recipes);
    } catch (error) {
      response.status(500).send(error);
    }
  });


  module.exports = app;