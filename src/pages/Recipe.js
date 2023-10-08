import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Recipe.css';


function RecipePage() {  
  const location = useLocation();
  const { isLoading } = useAuth0();
  const recipeJSON = location.state;
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div>
        <a href='/home'>
          <img src="back.svg" className="back"/>
        </a>
        { recipeJSON !== null ?
          <div>
            <h1>{recipeJSON.name}</h1>
            {recipeJSON.description}
            {console.log(recipeJSON.ingredients)}
            {recipeJSON.ingredients}
            {recipeJSON.recipe}
            <img className='recipeImage' src={'/uploads/'+recipeJSON.image.filename}></img>
          </div>
          :
          <h1 class>
            You aren't supposed to be here! Go back and click on a recipe &#62;:&#40;
          </h1>
        }

        
      </div>

  );
};
  
  export default RecipePage;