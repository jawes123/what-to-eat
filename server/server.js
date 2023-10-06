const express = require("express");
const {User, Recipe} = require("./models");
const mongoose = require("mongoose");
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require('body-parser');
const multer = require('multer');
const methodOverride = require('method-override');

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


app.post("/add_recipe", upload.single('file'), async (request, response) => {
  const res = await fetch("http://localhost:3001/users/jamesyu0141@gmail.com") //static email for now
  const resJSON = res.json(); //promise containing the json object of the user
  resJSON.then(async function(userJSONObj) {
    let userJSON = userJSONObj[0];
    const newRecipe = new Recipe({
      name: request.body.name,
      description: request.body.description,
      ingredients: request.body.ingredients,
      recipe: request.body.recipe,
      image: request.file
   });
  const updated = await User.findOneAndUpdate({email:userJSON.email}, {$push: {recipes: newRecipe}}, {
    new:true,
   });

   try {
     response.redirect("http://localhost:3000/recipe");
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



app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
