import './Home.css';
import {useNavigate} from 'react-router-dom';

function Home() {
    // function hover(image) {
    //   image.currentTarget.src = "/hamburg.jpeg";
    // }
    // function leaveHover(image) {
    //   image.currentTarget.src = "/pokebowl.jpeg";
    // }
    const navigate = useNavigate();
  
    const navigateRecipe = (event) => {
        navigate('/recipe', {state: {"id":1,"name":"yes"}}/*later will be dynamic JSON of clicked recipe*/);
    };

    return (
        <div className="App"> 
          <img src={"/hamburger-menu-icon.jpeg"} alt="hamburg" className="hamburg"/>
          <h1 className="title">Your Recipes</h1>
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
        );
    };
    export default Home;