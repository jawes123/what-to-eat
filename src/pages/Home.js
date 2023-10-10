import './Home.css';
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Logout from './Logout'
import { useAuth0 } from "@auth0/auth0-react";
import CreateRecipe from './components/CreateRecipe';

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

    //form validation function, disables submit button until all fields are non-empty
    const handleChange = (event) => {
        if(document.getElementById('name').value!=="" && document.getElementById('description').value!=="" && document.getElementById('ingredients').value!=="" && document.getElementById('recipe').value!=="" && document.getElementById('file').value!==""){
            document.getElementById('submit').disabled=false;
        }
        else{
            document.getElementById('submit').disabled=true;
        }
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
                <button className="close-btn" onClick={() => setShowPopup(false)}>&#10005;</button>

                <h3 style={{textAlign: "center",marginBottom:"10px"}}>Enter Recipe Details</h3>
                <form 
                    className="myform" 
                    id="myForm" 
                    name="myForm" 
                    action={"http://localhost:3001/add_recipe/"+user.email} 
                    method="POST" 
                    enctype="multipart/form-data">
                   
                    Name: <input 
                            className="nameInput" 
                            type="text" 
                            name="name"
                            id="name"
                            onChange={handleChange}
                            /><br/>
                    Description: <textarea 
                                    rows="5" 
                                    cols="60" 
                                    class="textarea resize-ta"
                                    name="description"
                                    id="description"
                                    onChange={handleChange}
                                    /><br/>
                    Ingredients: <textarea 
                                    rows="5" 
                                    cols="60" 
                                    name="ingredients"
                                    id="ingredients"
                                    class="textarea resize-ta"
                                    onChange={handleChange}
                                    /><br/>
                    Recipe: <textarea 
                                rows="5" 
                                cols="60" 
                                name="recipe"
                                id="recipe"
                                class="textarea resize-ta"
                                onChange={handleChange}
                                /><br/>
                    Image: <input 
                                type="file" 
                                name="file"
                                id="file"
                                onChange={handleChange}
                                /><br/>
                    
                
                    <button className="submit" disabled="true" id="submit" type="submit">Submit</button>
                    <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
                </form>

            </CreateRecipe>
            :
            null
            }

        </div>
        );
    };

    export default Home;