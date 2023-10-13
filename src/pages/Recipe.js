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
  //recipeJSON = {...,"1 cup this\n1 TBS that",...}

  const addBulletPoints = (str) => {
    let arr = str.split('\n');
    console.log(arr);
    // let leftIndex = 0;
    // for(let i = 0; i < str.length; i++){
    //   if((str.charAt(i)==='\\' && str.charAt(i+1)==='n')){
    //     i=i+2;
    //     arr.push("&#x2022; "+str.substring(leftIndex,i));
    //     leftIndex = i;
    //   }
    // }
    return arr;
  }//\r\n

  return (
      <div>
        <a href='/home'>
          <img src="back.svg" className="back"/>
        </a>
        { recipeJSON !== null ?
          <div>
            <h1 className="name">{recipeJSON.name}</h1>

            <div className="desc">
            <strong>Description:</strong> {recipeJSON.description}
            </div>

            <div className="ingredients">
              <strong>Ingredients: <br/><br/></strong>{recipeJSON.ingredients.split('\r\n').map(str => `\u2022 ${str}\n`)}
            </div>

            <div className="recipe">
              <strong>Recipe Instructions: <br/><br/></strong>{recipeJSON.recipe.split('\r\n').map((str,index) => `${index+1}. ${str}\n`)}
            </div>

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