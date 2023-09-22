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