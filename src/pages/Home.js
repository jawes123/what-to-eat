import './Home.css';
import React, { useEffect, useState } from "react";
import {useNavigate, Navigate} from 'react-router-dom';
import Logout from './Logout'
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
    const navigate = useNavigate();
    const navigateRecipe = (event) => {
        navigate('/recipe', {state: {"id":1,"name":"yes"}}/*later will be dynamic JSON of clicked recipe*/);
    };
    const navigateProfile = (event) => {
        navigate('/profile')
    }    
    const [userJSON, setUserJSON] = useState("");
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

    return (
        <div className="App"> 
            <button onClick={navigateProfile}>profile</button>
            <Logout/>
            <img src={"/hamburger-menu-icon.jpeg"} alt="hamburg" className="hamburg"/>
            <h1 className="title">Your Recipes</h1>
            <div className="box">
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe1"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe2"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe3"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe4"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe5"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe6"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe7"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe8"/>
                <img src={"/pokebowl.jpeg"} onClick={navigateRecipe} className="recipe9"/>
            </div>
        </div>
        );
    };

    export default Home;