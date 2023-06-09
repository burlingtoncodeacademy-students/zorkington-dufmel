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
  constructor(name, description, invetory, isLocked, sign) {
    (this.name = name),
      (this.description = description),
      (this.inventory = invetory),
      (this.isLocked = isLocked);
      (this.sign = sign)
  }
  readSign() {console.log(this.sign)}
}

let startingRoom = new Room(
  "porch",
  "123 Main St.",
  [],
  false,
  `The sign says "Welcome to Burlington Code Academy!
  Come on up to the third floor.
  If the door is locked, use the code 12345.`
);

let foyer = new Room(
  "foyer",
  "You are in a foyer.\nOr maybe it's an antechamber.\nOr a vestibule.\nOr an entryway.\nOr an atrium.\nOr a narthex. \nBut let's forget all that fancy flatlander vocabulary, and just call it a foyer.\nIn Vermont, this is pronounced 'FO-ee-yurr.' Anyways, it's definitely not a mudroom.\nA copy of Seven Days lies in a corner. There are two doors.\nOne goes into the office. The other goes into the living room.",
  ["paper"],
  true,
  "");

let office = new Room (
  "office",
  "The office is a bit musty. It looks like you can get to the bedroom from here.\nThere is a computer on the desk. It is asking for a password.", 
  ['notepad'],
  false,
  'When you enter the computer password, you get a pop-up message that says,\n"The bedroom password is 135."')

let bedroom = new Room(
  "bedroom",
  "You've reached the holy grail! Look at that king sized bed!",
  [],
  true,
  "Congratulations! You win! Enjoy your nap!")

let livingRoom = new Room("Living Room",
"There is a roaring fire, a comfy sofa, and a giant deer head over the mantle.\nNext to the fireplace there is a recyling basket filled with newspaper like you found in the foyer.\nThere is a door to the kitchen.",
[],
false,
"")

let kitchen = new Room("kitchen",
"Now this is a kitchen. Take a look at that pile of fruit on the counter\n You also notice a note on the refrigerator",
['fruit', 'note with password: zork'],
false,
'You find a note on the fridge that says "The computer password is zork." Hope you can remember that!')

let commands = ["change", "enter", "open", "go", "take", "pick", "drop", "put", "lie", "lay", "get"]

let nouns = ["fruit", "paper", "newspaper", "magazine", "note", "sign", "foyer", "office", "bedroom", "living room", "kitchen"]

function genericSentence(userInput){
  let newAnswer = []
  let answerArray = userInput.split(" ")
  answerArray.forEach(word => {
    commands.includes(word) ? newAnswer.push(word) : null
    nouns.includes(word) ? newAnswer.push(word) : null
  }
    )
  let sentence = newAnswer.join(" ")
  return sentence
}

console.log(genericSentence("drop the newspaper"))

//state machine to establish room movement (room state, current room variable, function to move rooms)
let roomState = {
  startingRoom: ["foyer"],
  foyer: ["startingRoom", "office", "livingRoom"],
  office: ["foyer", "bedroom"],
  bedroom: ["foyer"],
  livingRoom: ["foyer", "kitchen"],
  kitchen: ["livingRoom"]
};

let currentRoom = "startingRoom"; //this will update as player moves throughout the game


function changeRooms(newRoom) {
  console.log(newRoom)
  let validTransition = roomState[currentRoom];
  console.log(validTransition);
  if (validTransition.includes(newRoom)) {
    currentRoom = newRoom;
    console.log(`You have entered the ${currentRoom}`);
  } else {
    console.log(`You cannot get to the ${newRoom} from the ${currentRoom}`);
  }
}


//player inventory will change as functions are called to move items

let playerInventory = [];

function addInventory(item) {
  playerInventory.push(item);
  // ! add code to remove item from room
}

function removeInventory(item) {
  playerInventory = playerInventory.filter(i => i !== item)
  // !add code here to put item back in room inventory
}

let hints = "Try one of these commands: enter, read, take, drop, inventory"

//**********End of code-base for reusable items later in the game*******/

//*********START GAME HERE**********************/
const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.\n
If you're not sure what to do, ask for a "hint"\n
>_`;
start();
async function start() {

  let answer = await ask(welcomeMessage);
  answer = genericSentence(answer)
  
  while (answer !== "exit") {
    if (answer.toLowerCase() == "hint") {
      console.log(hints);
    } else if (answer == "read sign") {
      startingRoom.readSign();
    } else if (answer == "12345" && foyer.isLocked){
      console.log("You unlocked the door")
      foyer.isLocked = false
    } else if (answer == "12345" && !foyer.isLocked){
      console.log("You already unlocked the door")
    } else if (answer == "take sign" || answer == "grab sign"){
      console.log("Don't take the sign. That's not nice")
    } else if (answer == "enter foyer" && !foyer.isLocked){
      answer = answer.slice(6)
      changeRooms(answer)
      foyer.readSign()
    } else if (answer == "enter foyer" && foyer.isLocked) {
      console.log("You need to unlock the door, first")
    } else {
      console.log(`I don't know how to ${answer}`);
    }

    answer = await ask(">_ ");
    answer = genericSentence(answer)
  }
  


    
  process.exit();
}
