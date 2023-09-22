const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [String],
  instructions: [String],
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  recipes: {
    type: [RecipeSchema]
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  User, Recipe
};