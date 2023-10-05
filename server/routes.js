
// const express = require("express");
// const {User, Recipe} = require("./models");
// const app = express();
// const dotenv = require("dotenv")
// dotenv.config()
// const multer = require('multer');
// const upload = multer({storage})
// console.log(storage)

// app.post("/add_user", async (request, response) => {
//     const newUser = new User({
//         name: request.body.name,
//         age: request.body.age
//      });
  
//     try {
//       await newUser.save();
//       response.send(newUser);
//     } catch (error) {
//       response.status(500).send(error);
//     }
// });
// app.get("/users/:email", async (request, response) => {
//     const usr = await User.find({email: request.params.email});
  
//     try {
//       response.send(usr);
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

  
// app.post("/add_recipe", upload.single('image'), async (request, response) => {
//     const res = await fetch("http://localhost:3001/users/jamesyu0141@gmail.com") //static email for now
//     const resJSON = res.json(); //promise containing the json object of the user
//     resJSON.then(async function(userJSONObj) {
//       let userJSON = userJSONObj[0];
//       const newRecipe = new Recipe({
//         name: request.body.name,
//         description: request.body.description,
//         ingredients: request.body.ingredients,
//         recipe: request.body.recipe,
//         image: request.file
//      });

//     const updated = await User.findOneAndUpdate({email:userJSON.email}, {$push: {recipes: newRecipe}}, {
//       new:true,
//      });
  
//      try {
//        response.send(updated);
//      } catch (error) {
//        response.status(500).send(error);
//      }
//    })

//   });
// app.get("/recipes/:email", async (request, response) => {
//     const usr = await User.find({email: request.params.email});
//     const recipes = usr[0].recipes
//     try {
//       response.send(recipes);
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });


//   module.exports = app;