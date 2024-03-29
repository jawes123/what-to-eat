const express = require("express");
const {User, Recipe} = require("./models");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');
const fs = require('fs')

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const username = "jawes";
const password = "RnXuTxp0ERdDlivT";
const cluster = "cluster0.unxvrcj";
const dbname = "Recipes";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({storage: storage});



/* Routes */
// Add new user
app.post("/add_user/:email", async (request, response) => {
  const newUser = new User({
      email: request.params.email,
      recipes: [],
  });

  try {
    await newUser.save();
    response.send(newUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Get current user
app.get("/users/:email", async (request, response) => {
  let usr = await User.find({email: request.params.email});
  if(usr.length==0){
    const url = "http://localhost:3001/add_user/"+request.params.email
    await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    })
      
  }
  try {
    response.send(usr);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Add recipe to user object
app.post("/add_recipe/:email", upload.single('file'), async (request, response) => {
  const res = await fetch("http://localhost:3001/users/"+request.params.email) 
  const resJSON = res.json(); 
  resJSON.then(async function(userJSONObj) {
    let userJSON = userJSONObj[0];
    const newRecipe = new Recipe({
      name: request.body.name,
      description: request.body.description,
      ingredients: request.body.ingredients,
      recipe: request.body.recipe,
      image: request.file
   });
  const updated = await User.findOneAndUpdate({email:userJSON.email}, {$push: {recipes: newRecipe}}, 
    { new:true }
    );

   try {
     response.redirect("http://localhost:3000/home");
   } catch (error) {
     response.status(500).send(error);
   }
 })
});

// Get all recipes for current user
app.get("/recipes/:email", async (request, response) => {
  const usr = await User.find({email: request.params.email});
  if(usr.length==0){
    response.send({});
    return;
  }
  const recipes = usr[0].recipes
  try {
    response.send(recipes);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Delete one recipe from current user object
app.delete("/del_recipe/:email/:recipeID", async (request, response) => {
  const res = await fetch("http://localhost:3001/users/"+request.params.email)
  const resJSON = res.json(); 
  resJSON.then(async function(userJSONObj) { 

    // del from db
    const del = await User.findOneAndUpdate(
      { _id: userJSONObj[0]._id},
      { $pull: { recipes: { _id: request.params.recipeID} } },
      { new: true }
    )
    
    // del image from local
    let photoJSON = userJSONObj[0].recipes.filter((x) => {return x._id===request.params.recipeID}).pop()
    fs.unlink(photoJSON.image.path,(err) => console.error(err))
    
    try {
      response.send(del);
    } catch (error) {
      response.status(500).send(error);
    }
 })
})


app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
