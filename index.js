//******Comments with astricks are to help find your place in the code*******/
//Plain comments will remain to help explain code
//!Red comments are to indicate incomplete code

// const {Room, addInventory, removeInventory,} = require("./commands.js");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

//**********Building code-base for reusable items later in the game*******/

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// room contructor to create each new room
class Room {
  constructor(name, description, invetory, isLocked) {
    (this.name = name),
      (this.description = description),
      (this.inventory = invetory),
      (this.isLocked = isLocked);
  }
}

let startingRoom = new Room("Starting Room", "123 Main St.", [], false);
let foyer = new Room("foyer", "main room", ["paper"], true);

//state machine to establish room movement (room state, current room variable, function to move rooms)
let roomState = {
  startingRoom: [foyer],
  foyer: [startingRoom],
  //! Add rooms as you create them
};

function changeRooms(newRoom) {
  let validTransition = roomState[currentRoom];
  console.log(validTransition);
  if (validTransition.includes(newRoom)) {
    currentRoom = newRoom;
    console.log(`You have entered the ${currentRoom.description}`);
  } else {
    console.log(`You cannot get to the ${newRoom} from the ${currentRoom}`);
  }
}

let currentRoom = "startingRoom"; //this will update as player moves throughout the game


function addInventory(item) {
  playerInventory.push(item);
  // ! add code to remove item from room
}

function removeInventory(item) {
  // !add code here to remove item from player inventory and put in room
}

//player inventory will change as functions are called to move items
let playerInventory = [];

  let sign = {
    description: `The sign says "Welcome to Burlington Code Academy!
  Come on up to the third floor.
  If the door is locked, use the code 12345.`,
    read() {
      console.log(this.description);
    },
  };

//**********End of code-base for reusable items later in the game*******/

//*********START GAME HERE**********************/
const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.\n
>_`;
start();
async function start() {

  let answer = await ask(welcomeMessage);

  if (answer == "read sign"){
    sign.read()
  }

while (answer !== "exit") {
  answer = await ask(">_ ");
}

  while (answer.toLowercase !== "12345") {
    switch (true) {
      case answer.toLowerCase() == "go upstairs" && foyer.isLocked:
        console.log("The door is locked");
        answer = await ask(">_");
        break;
      case answer.toLowerCase() == "take sign":
        console.log("That's rude. You can't take the sign");
        answer = await ask(">_");
        break;
      case answer == 12345:
        foyer.isLocked = false;
        changeRooms(foyer); //! move outside of switch statement !
        break;
      default:
        console.log("I don't know how to do that.");
        answer = await ask(">_");
    }
  }

  console.log();
  process.exit();
}
