
import './App.css';

function App() {
  // function hover(image) {
  //   image.currentTarget.src = "/hamburg.jpeg";
  // }
  // function leaveHover(image) {
  //   image.currentTarget.src = "/pokebowl.jpeg";
  // }
  return (
    <div className="App"> 
      <img src={"/hamburger-menu-icon.jpeg"} alt="hamburg" className="hamburg"/>
      <h1 className="title">Your Recipes</h1>
      <img src={"/pokebowl.jpeg"} /*onMouseOver={hover} onMouseOut={leaveHover}*/ alt="temp" className="image1"/>
      <img src={"/pokebowl.jpeg"} alt="image2" className="image2"/>
      <img src={"/pokebowl.jpeg"} alt="image3" className="image3"/>
      <img src={"/pokebowl.jpeg"} alt="image4" className="image4"/>
      <img src={"/pokebowl.jpeg"} alt="image5" className="image5"/>
      <img src={"/pokebowl.jpeg"} alt="image6" className="image6"/>
      <img src={"/pokebowl.jpeg"} alt="image7" className="image7"/>
      <img src={"/pokebowl.jpeg"} alt="image8" className="image8"/>
      <img src={"/pokebowl.jpeg"} alt="image9" className="image9"/>

    </div>
  );
}

export default App;
