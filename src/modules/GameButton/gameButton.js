import React from 'react';
import './gameButton.css';
import doorGame from '../DoorGame/doorGame';

export default function gameButton(props) {

    const handleOnClick = () => {
        if(!props.currentlyPlaying){
            props.startGame();
        } else {
            console.log('Du kannst ein Spiel nur starten, nachdem du verloren oder gewonnen hast.')
        }
    }
    
    return (
        <div id="start" 
            className="start-row" 
            onClick={handleOnClick}>
            {props.buttonText}
        </div>
    );

}