import React, { useEffect, useState } from "react";
import CreateRecipe from './components/CreateRecipe'
import { useAuth0 } from "@auth0/auth0-react";


function RecipePage() {
  const [recipeJSON, setRecipeJSON] = useState("");    
  const { user, isLoading } = useAuth0();
  useEffect(() => { 
    fetch("http://localhost:3001/recipes/"+user.email)
      .then((res) => {return res.json()})
      .then((recipeJSONObject) => {
        setRecipeJSON(recipeJSONObject[0])})
  })
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
      <div>
        {/* {recipeJSON.name}
        {recipeJSON.description}
        {recipeJSON.ingredients}
        {recipeJSON.recipe} */}
        <button>Add New Recipe</button>
        <CreateRecipe trigger={true}>
          <h3>Popup</h3>
          <form name="myForm" action="http://localhost:3001/add_recipe" method="POST" enctype="multipart/form-data">
            Name: <input type="text" name="name"/><br/>
            Description: <textarea name="description" class="textarea resize-ta"/><br/>
            Ingredients: <textarea name="ingredients" class="textarea resize-ta"/><br/>
            Recipe: <textarea name="recipe" class="textarea resize-ta"/><br/>
            Image: <input type="file" name="file"/><br/>
            <button type="submit">Submit</button>
          </form>

        </CreateRecipe>
      </div>

  );
};
  
  export default RecipePage;