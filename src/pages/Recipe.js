import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from 'react-router-dom';
import './Recipe.css';


function RecipePage() {  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth0();
  const recipeJSON = location.state;


  const handleDelete = async () => {
    console.log(recipeJSON)
    await fetch(`http://localhost:3001/del_recipe/${user.email}/${recipeJSON._id}`, {
      method: 'DELETE',
    })
    .then(res => navigate('/home'))
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div>
        <a href='/home'>
          <img src="back.svg" className="back"/>
        </a>
        <button className="delete-btn" onClick={handleDelete}>Delete Recipe</button>
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