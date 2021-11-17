//import App CSS
import './App.css';
import React, {useState} from 'react';

//import function components
import Navigation from '../Navigation/navigation';
import Score from '../Score/Score';
import DoorGame from '../DoorGame/doorGame';
import GameButton from '../GameButton/gameButton';

//imports pictures for rendering later
import closedDoor from './closed_door.svg';
import robotDoor from './robot_door.svg';
import beachDoor from './beach_door.svg';
import spaceDoor from './space_door.svg';

//will the store the earlier imported pictures in a object
const doorImage = {
    closedDoor: closedDoor,
    robot: robotDoor,
    beach: beachDoor,
    space: spaceDoor
};


function App() {

  //Declare React States, via React Hooks
  const [ numClosedDoors, setNumClosedDoors ] = useState(0);
  const [ currentlyPlaying, setCurrentlyPlaying ] = useState(false);
  const [ doors, setDoors ] = useState(
    [
      {id: 'door1', src: '', closedDoor: doorImage.closedDoor, open: false},
      {id: 'door2', src: '', closedDoor: doorImage.closedDoor, open: false},
      {id: 'door3', src: '', closedDoor: doorImage.closedDoor, open: false}
    ]);
    const [ startButtonText, setStartButtonText ] = useState("Spiel starten");
    const [ wins, setWins ] = useState(0);
    const [ losses, setLosses ] = useState(0);

    const handleGameConfigurations = () => {
      // 1. reset game settings back to the state when the game was launched first time
      resetGameSettings();
      // 2. all open doors will be closed, if they was opened.
      closeDoors();
      // 3. will randomly generate the hidden pictures, hiding the chorebot.
      randomChoreDoorGenerator();
    }

    const openDoor = (door) => {
      // will receive the clicked door from doorGame.js openDoor()
      if (currentlyPlaying === false){
        gameOver();
      } else {
        console.log(`Du hast ${door} geöffnet.`);
        let listOfDoors = doors;
        let index = listOfDoors.indexOf(listOfDoors.find(doorKey => (doorKey.id === door)));
        listOfDoors[index].open = true;
        reduceDoors();
        setDoors(listOfDoors);
      }
    }

    const checkForRobot = (door) => {
      if(numClosedDoors === 1){
        gameOver('win');
      } else {
        let listOfDoors = doors;
        let index = listOfDoors.indexOf(listOfDoors.find(doorKey => (doorKey.id === door)));
        if(listOfDoors[index].src === doorImage.robot){
          console.log('Viel Spaß beim Putzen!');
          gameOver();
          setCurrentlyPlaying(false);
        }
      }
    }

    const reduceDoors = () => {
      // will decrease the number of closed doors stored in state with each click
      setNumClosedDoors(prevNumOfDoors => --prevNumOfDoors);
    }

    const randomChoreDoorGenerator = () => {
      // This function will generate the hidden images for each door and store it inside the state
      const randomDoorGenerator = Math.floor(Math.random() * 3);
      let randomDoors = doors;
      if (randomDoorGenerator === 0) {
      /*
       * future reference: Immutably changing is not working correctly yet. 
       * randomDoors[0].src is updating the state already. 
       *
       **/ 
        randomDoors[0].src = doorImage.robot;
        randomDoors[1].src = doorImage.beach;
        randomDoors[2].src = doorImage.space;
        setDoors(randomDoors);
      } else if (randomDoorGenerator === 1) {
        randomDoors[0].src = doorImage.beach;
        randomDoors[1].src = doorImage.robot;
        randomDoors[2].src = doorImage.space;
        setDoors(randomDoors);
    } else {
        randomDoors[0].src = doorImage.space;
        randomDoors[1].src = doorImage.beach;
        randomDoors[2].src = doorImage.robot;
        setDoors(randomDoors);
    }
    console.log('Success: Türen wurden generiert.');
    }

  const gameOver = (status) => {
    // argument will show the user if he has won or lost
    if (status === 'win') {
      countWins();
      setCurrentlyPlaying(false);
      setStartButtonText("Gewonnen! Erneut spielen?");
    } else {
      countLosses();
      setStartButtonText("Game Over! Erneut spielen?")
    }
  }

  const countWins = () => {
    // will increase the win count +1
    if(currentlyPlaying){
      setWins(prevWins => ++prevWins);
    } else {
      return;
    }
  }

  const countLosses = () => {
    //will increase the loss count +1
    if(currentlyPlaying){ 
      setLosses(prevLosses => ++prevLosses);
    } else {
      return;
    }
  }

  const closeDoors = () => {
    // will close all open doors 
    console.log('Alle Türen sind geschlossen.');
    let listOfDoors = doors;
    listOfDoors.forEach(element => element.open = false);
    setDoors(listOfDoors);
  }

  const resetGameSettings = () => {
    // reset Settings of Game via React Hooks back to Standard before Playing.
    console.log('GameSettings RESET is DONE');
    setNumClosedDoors(3);
    setCurrentlyPlaying(true);
    setDoors([
      {id: 'door1', src: '', closedDoor: doorImage.closedDoor},
      {id: 'door2', src: '', closedDoor: doorImage.closedDoor},
      {id: 'door3', src: '', closedDoor: doorImage.closedDoor}
    ]);
    setStartButtonText("Viel Glück!");

  }

  return (
    <div>
      <Navigation />
      <Score winCount={wins} lossCount={losses}/>
      <DoorGame
        doors={doors}
        currentlyPlaying={currentlyPlaying}
        openDoorLogic={openDoor}
        checkIfGameOver={gameOver}
        checkForRobot={checkForRobot}/>
      <GameButton
        buttonText={startButtonText}
        currentlyPlaying={currentlyPlaying}
        startGame={handleGameConfigurations} />
    </div>
  );
  
}

export default App;
