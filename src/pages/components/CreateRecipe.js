import React from 'react';
import "./CreateRecipe.css";

function CreateRecipe(props) {
    return (
        
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn">close</button>
                {props.children}
            </div>
        </div>
    );
}

export default CreateRecipe;