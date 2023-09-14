import React, { useEffect, useState } from "react";
import CreateRecipe from './components/CreateRecipe'



function RecipePage() {
  const [recipeJSON, setRecipeJSON] = useState("");
  useEffect(() => { 
    fetch("http://localhost:3001/recipes")
      .then((res) => {return res.json()})
      .then((recipeJSONObject) => {
        setRecipeJSON(recipeJSONObject[0])})
  })
  
  return (
      <div>
        {recipeJSON.name}
        {recipeJSON.description}
        {recipeJSON.ingredients}
        {recipeJSON.recipe}
        <button>Add New Recipe</button>
        <CreateRecipe trigger={true}>
          <h3>Popup</h3>
        </CreateRecipe>
      </div>

  );
};
  
  export default RecipePage;