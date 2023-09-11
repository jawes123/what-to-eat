import {useLocation} from 'react-router-dom';
import React, { useEffect, useState } from "react";



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
      </div>

  );
};

  function typ(x) {
    return typeof x
  }
  
  export default RecipePage;