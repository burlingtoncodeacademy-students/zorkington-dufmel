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

let startingRoom = new Room("porch", "123 Main St.", [], false);
let foyer = new Room("foyer", "You are in a foyer.\nOr maybe it's an antechamber.\nOr a vestibule.\nOr an entryway.\nOr an atrium.\nOr a narthex. \nBut let's forget all that fancy flatlander vocabulary, and just call it a foyer.In Vermont, this is pronounced 'FO-ee-yurr.' Anyways, it's definitely not a mudroom. A copy of Seven Days lies in a corner.", ["paper"], true);
let office = new Room ("office", "The office is a bit musty. It looks like you can get to the bedroom from here. There is a computer on the desk. It is asking for a password.", [notepad], false)
let bedroom = new Room("bedroom", "You've reached the holy grail! Look at that king sized bed!", [], true)
let livingRoom = new Room("Living Room", "There is a roaring fire, a comfy sofa, and a giant deer head hanging over the mantle. Next to the fireplace there is a recyling basket filled with newspaper like you found in the foyer. There is a door to the kitchen.", [], false)
let kitchen = new Room("kitchen", "Now this is a kitchen. Take a look at that pile of fruit on the counter! You also notice a note on the refrigeratro", [fruit], false)

//state machine to establish room movement (room state, current room variable, function to move rooms)
let roomState = {
  startingRoom: [foyer],
  foyer: [startingRoom, office, livingRoom],
  office: [foyer, bedroom],
  bedroom: [foyer],
  livingRoom: [foyer, kitchen],
  kitchen: [livingRoom]
};

function changeRooms(newRoom) {
  let validTransition = roomState[currentRoom];
  console.log(validTransition);
  if (validTransition.includes(newRoom)) {
    currentRoom = newRoom;
    console.log(`You have entered the ${currentRoom.name}`);
  } else {
    console.log(`You cannot get to the ${newRoom} from the ${currentRoom}`);
  }
}

let currentRoom = "startingRoom"; //this will update as player moves throughout the game

let playerInventory = [];

function addInventory(item) {
  playerInventory.push(item);
  // ! add code to remove item from room
}

function removeInventory(item) {
  playerInventory.filter(item)
  // !add code here to remove item from player inventory and put in room
}

addInventory("paper")
console.log(playerInventory)

//player inventory will change as functions are called to move items

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
