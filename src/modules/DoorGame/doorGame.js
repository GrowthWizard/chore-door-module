import React from 'react';
import './doorGame.css';

export default function DoorGame(props) {

    /*useEffect(() => {
        const renderDoors = props.doors;
        renderDoors.map(door => {
            return <img
            key={door.id}
            id={door.id}
            className="door-frame"
              src={(props.currentlyPlaying === false && door.open === false) || 
                  (props.currentlyPlaying === true && door.open === false) ? 
                  door.closedDoor : door.src}
            isOpen={door.open} 
            onClick={handleOnClick} />
      })
    }, [])*/

    const handleOnClick = (event) => {
        // with each click we will pass the doorname (event) to functions
        openDoor(event);
        props.checkForRobot(event.target.id);
    }

    const openDoor = (event) => {
        // will pass the door.id to App.js via prop
        let listOfDoors = props.doors;
        // check which door inside of the array has to be changed.
        let chosenDoor = listOfDoors.indexOf(listOfDoors.find(doorKey => (doorKey.id === event.target.id)));
        if(listOfDoors[chosenDoor].open === false){
            //pass the opened door id to App.js openDoor() function
            props.openDoorLogic(event.target.id);
        } else {
            console.log('Error: Tür ist bereits geöffnet!');
            return;
        }
    }

    return (
        <div className="door-row">
            {console.log(props.doors)}
            { props.doors.map(door => {
                    return <img
                        key={door.id}
                        id={door.id}
                        className="door-frame"
                        src={(props.currentlyPlaying === false && door.open === false) || 
                        (props.currentlyPlaying === true && door.open === false) ? 
                        door.closedDoor : door.src}
                        isOpen={door.open} 
                        onClick={handleOnClick} />
                    })
            }
        </div>
    );
}