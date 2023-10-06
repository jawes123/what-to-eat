import React, { useEffect, useState } from "react";
import CreateRecipe from './components/CreateRecipe'
import { useAuth0 } from "@auth0/auth0-react";


function RecipePage() {
  const [recipeJSON, setRecipeJSON] = useState("");    
  const [showPopup, setShowPopup] = useState(false)
  console.log(showPopup)
  const { user, isLoading } = useAuth0();
  useEffect(() => { 
    fetch("http://localhost:3001/recipes/"+user.email)
      .then((res) => {return res.json()})
      .then((recipeJSONObject) => {
        setRecipeJSON(recipeJSONObject[0])})
  },[user])
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div>
        { recipeJSON !== undefined ?
          <p>
            {recipeJSON.name}
            {recipeJSON.description}
            {recipeJSON.ingredients}
            {recipeJSON.recipe}
          </p>
          :
          <h1>
            You have no recipes. Please add a recipe by clicking 'Add Recipe'.
          </h1>
        }

        <button className="addRecipeBtn" onClick={() => setShowPopup(true)}>Add New Recipe</button>
        { showPopup ?
        <CreateRecipe onClickOutside={() => setShowPopup(false)}>
          <button className="close-btn" onClick={() => setShowPopup(false)}>close</button>
          <h3>Enter Recipe Details</h3>
          <form name="myForm" action="http://localhost:3001/add_recipe" method="POST" enctype="multipart/form-data">
            Name: <input type="text" name="name"/><br/>
            Description: <textarea name="description" class="textarea resize-ta"/><br/>
            Ingredients: <textarea name="ingredients" class="textarea resize-ta"/><br/>
            Recipe: <textarea name="recipe" class="textarea resize-ta"/><br/>
            Image: <input type="file" name="file"/><br/>
            <button type="submit">Submit</button>
          </form>
        </CreateRecipe>
        :
        null
        }
      </div>

  );
};
  
  export default RecipePage;