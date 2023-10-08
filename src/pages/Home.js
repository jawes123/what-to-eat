import './Home.css';
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Logout from './Logout'
import { useAuth0 } from "@auth0/auth0-react";
import CreateRecipe from './components/CreateRecipe'

function Home() {
    const navigate = useNavigate();
    const navigateRecipe = (object) => {
        console.log(object)
        navigate('/recipe', {state: object}/*later will be dynamic JSON of clicked recipe*/);
    };
    const navigateProfile = (event) => {
        navigate('/profile')
    }    
    const [userJSON, setUserJSON] = useState("");
    const [showPopup, setShowPopup] = useState(false)
    const { user, isLoading } = useAuth0();
    useEffect(() => { 
      fetch("http://localhost:3001/users/"+user.email)
        .then((res) => {return res.json()})
        .then((userJSONObject) => {
          setUserJSON(userJSONObject[0])})
    }, [user])
    console.log(userJSON)
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    //need to get user json
    //then map thru 'Recipes' to display each on frontend
    //depending on the image clicked, send recipe info to /recipes
    return (
        <div className="App">
            <button onClick={navigateProfile}>profile</button>
            <Logout/>
            <img src={"/hamburger-menu-icon.jpeg"} alt="hamburg" className="hamburg"/>
            <h1 className="title">Your Recipes</h1>

            { userJSON !== undefined && userJSON.recipes !== undefined && Object.keys(userJSON.recipes).length!==0 ?
            <div className="box">
                {
                userJSON.recipes.map(
                    (object) => (<img src={"/uploads/"+object.image.filename} onClick={()=>navigateRecipe(object)} />)
                    )
                }
            </div>
            :
            <h1 className="noRecipeWarning"> You have no recipes. Please add a recipe by clicking 'Add New Recipe' button. </h1>
            }
            

            <button className="addRecipeBtn" onClick={() => setShowPopup(true)}>Add New Recipe</button>
            { showPopup ?
            <CreateRecipe>
            <button className="close-btn" onClick={() => setShowPopup(false)}>close</button>
            <h3>Enter Recipe Details</h3>
            <form name="myForm" action={"http://localhost:3001/add_recipe/"+user.email} method="POST" enctype="multipart/form-data">
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

    export default Home;