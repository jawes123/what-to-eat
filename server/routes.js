
const express = require("express");
const {User, Recipe} = require("./models");
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

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

  
app.post("/add_recipe", upload.single('image'), async (request, response) => {
    //if(request.body.email)
    //const { user, isLoading } = useAuth0();
    const res = await fetch("http://localhost:3001/users/jamesyu0141@gmail.com")
    const resJSON = res.json();
    const userJSON = resJSON[0];
    // fetch("http://localhost:3001/users")
    // .then((res) => {return res.json()})
    // .then((userJSONObject) => {
    //   setUserJSON(userJSONObject[0])})
    resJSON.then(async function(userJSONObj) {
      let userJSON = userJSONObj[0]; 
      const newRecipe = new Recipe({
        name: request.body.name,
        description: request.body.description,
        ingredients: request.body.ingredients,
        recipe: request.body.recipe,
        image: request.file
     });
  
     try {
       //await newRecipe.save();
       //response.send(request.file)
       response.send(newRecipe);
     } catch (error) {
       response.status(500).send(error);
     }
   })

  });
app.get("/recipes/:email", async (request, response) => {
    const usr = await User.find({email: request.params.email});
    const recipes = usr[0].recipes
    try {
      response.send(recipes);
    } catch (error) {
      response.status(500).send(error);
    }
  });


  module.exports = app;