import React from 'react';
import "./CreateRecipe.css";

function CreateRecipe(props) {
    return (
        
        <div className="popup">
            <div className="popup-inner">
                {props.children}
            </div>
        </div>
    );
}

export default CreateRecipe;