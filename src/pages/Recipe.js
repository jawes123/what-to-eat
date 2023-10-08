import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


function RecipePage() {
  const [recipeJSON, setRecipeJSON] = useState("");    
  
  const { user, isLoading } = useAuth0();
  useEffect(() => { 
    fetch("http://localhost:3001/recipes/"+user.email)
      .then((res) => {return res.json()})
      .then((recipeJSONObject) => {
        setRecipeJSON(recipeJSONObject[0])})  //later change to dynamically get indexes of 'recipeJSONObject' based on img clicked
  },[user])
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div>
        { recipeJSON !== undefined && Object.keys(recipeJSON).length!==0 ?
          <p>
            <h1>{recipeJSON.name}</h1>
            {recipeJSON.description}
            {recipeJSON.ingredients}
            {recipeJSON.recipe}
            {console.log("hello")}
            <img className='recipeImage' src={'/uploads/'+recipeJSON.image.filename}></img>
          </p>
          :
          <h1>
            You have no recipes. Please add a recipe by clicking 'Add Recipe'.
          </h1>
        }

        
      </div>

  );
};
  
  export default RecipePage;