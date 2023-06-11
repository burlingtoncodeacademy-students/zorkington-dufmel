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
  constructor(name, description, invetory, isLocked, sign, password) {
    this.name = name,
      this.description = description,
      this.inventory = invetory,
      this.isLocked = isLocked,
      this.sign = sign,
      this.password = password
  }

  readSign () {console.log(this.sign)};

  readDescription() {console.log(this.description)};
}

let porch = new Room(
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
  "You are in a foyer.\nOr maybe it's an antechamber.\nOr a vestibule.\nOr an entryway.\nOr an atrium.\nOr a narthex. \nBut let's forget all that fancy flatlander vocabulary, and just call it a foyer.\nIn Vermont, this is pronounced 'FO-ee-yurr.' Anyways, it's definitely not a mudroom.\nA copy of Seven Days lies in a corner. There are two doors.\nOne goes into the office. The other goes into the den.",
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
  "You have reached the bedroom. It's been a long day and you're exhausted. Take a look at that king size bed! There is a sign on the bed!",
  [],
  true,
  "Congratulations! You win! Enjoy your nap!",
  135
);

let den = new Room("den",
"There is a roaring fire, a comfy sofa, and a giant deer head over the mantle.\nNext to the fireplace there is a recyling basket filled with newspaper like you found in the foyer.\nThere is a door to the kitchen.",
[],
false,
"");

let kitchen = new Room("kitchen",
"Now this is a kitchen. Take a look at that pile of fruit on the counter\n You also notice a sign on the refrigerator",
['fruit', 'note with password: zork'],
false,
'You find a note on the fridge that says "The computer password is zork." Hope you can remember that!')

//Array of possible user inputs

let commands = {
    move: ["move", "change", "enter", "open", "go"],
    take:["take", "pick", "get"],
    drop:["drop", "put", "lie", "lay", "leave", "enter", "type",],
    read:["read", "look"]
}

let nouns = {
  rooms: ["foyer", "office", "bedroom", "den", "kitchen", "porch"],
  item: ["fruit", "paper", "newspaper", "magazine", "note", "sign", "zork"],
  password: ["12345", "135", "zork"]
};

//checks user inputs against above arrays to create generic phrases used in later logic

function genericSentence(userInput) {
  const answerObject = {
    verb: "",
    noun: ""
  }
  // let newAnswer = []
  let answerArray = userInput.split(" ")
  answerArray.forEach(word => {
    if (commands.move.includes(word)){
      answerObject.verb = "move"
    } else if (commands.read.includes(word)){
      answerObject.verb = "read"
    }
    else if (commands.take.includes(word)){
      answerObject.verb = "take"
    } else if (commands.drop.includes(word))
      answerObject.verb = "drop"
  })

  answerArray.forEach((word) => {
    if (nouns.rooms.includes(word) || nouns.item.includes(word) || nouns.password.includes(word)) {
      answerObject.noun = word;
    }
  });

  return answerObject
}

//state machine to establish room movement (room state, current room variable, function to move rooms)
let targetRooms = {
  porch: [foyer],
  foyer: [porch, office, den],
  office: [foyer, bedroom],
  bedroom: [foyer],
  den: [foyer, kitchen],
  kitchen: [den]
};

let currentRoom = "porch"; //this will update as player moves throughout the game
let roomObject = porch

function changeRooms(newRoom) {
  let listOfAllValidLocationsToTravel = targetRooms[currentRoom];
  
  //goes through all objects in targetRooms array to see if the value of the name key matches the newRoom
  //roomObject becomes the object and gives access to all of its key value pairs
    roomObject = listOfAllValidLocationsToTravel.find(room => {
    return newRoom === room.name
  })
  
  if (roomObject && !roomObject.isLocked){
    //return the object that contains the name value
    currentRoom = roomObject.name    
    roomObject.readDescription()
  } else if (roomObject && roomObject.isLocked){
    console.log("The door is locked.")
  } else{
    //if there is no match, return a statement that says you can't do that
    console.log(`You cannot get to the ${newRoom} from the ${currentRoom}.`)
  }
}


function unlockDoor (password) {
  if (password === "12345"){
    foyer.isLocked = false
    console.log("You unlocked the foyer.")
  } else if (password === "135"){
    bedroom.isLocked = false
    console.log("You unlocked the bedroom.")
  } else if (password === "zork"){
    console.log("The bedroom password is 135.")
  }
}

//player inventory will change as functions are called to move items

let playerInventory = [];

function addInventory(item) {
  
  playerInventory.push(item);
  console.log(`You have added ${item} to your inventory`)
  // ! add code to remove item from room
}

function removeInventory(item) {
  playerInventory.includes(item)
    ? playerInventory = playerInventory.filter(i => i !== item)
    : console.log(`You do not have ${item} in your inventory`)
  // !add code here to put item back in room inventory
}

// let hints = "Try one of these commands: enter, read, take, drop, inventory"

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
  answer = genericSentence(answer)
    
  while (currentRoom !== "bedroom") {
    if(answer.noun && !answer.verb){
      unlockDoor(answer.noun)
    }  
    else if (answer.verb === "move"){
      changeRooms(answer.noun)
    } else if (answer.verb == "take"){
      addInventory(answer.noun)
    } else if (answer.verb == "drop"){
      removeInventory(answer.noun)
    } else if (answer.verb === "read"){
      roomObject.readSign()
    } else {`Sorry, I don't know how to do that`}

    
    answer = await ask(">_ ");
    answer = genericSentence(answer)
  }
  
  answer = await ask ("To exit the game, type exit")
     
  process.exit();
}
