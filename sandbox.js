const WildBillsMagic = {
  porch: new Room(
    "porch",
    "123 Main St.",
    [],
    false,
    `The sign says "Welcome to Burlington Code Academy!
    Come on up to the third floor.
    If the door is locked, use the code 12345.`
  ),

  foyer: new Room(
    "foyer",
    "You are in a foyer.\nOr maybe it's an antechamber.\nOr a vestibule.\nOr an entryway.\nOr an atrium.\nOr a narthex. \nBut let's forget all that fancy flatlander vocabulary, and just call it a foyer.\nIn Vermont, this is pronounced 'FO-ee-yurr.' Anyways, it's definitely not a mudroom.\nA copy of Seven Days lies in a corner. There are two doors.\nOne goes into the office. The other goes into the living room.",
    ["paper"],
    true,
    "",
    12345
  ),

  office: new Room(
    "office",
    "The office is a bit musty. It looks like you can get to the bedroom from here.\nThere is a computer on the desk. It is asking for a password.",
    ["notepad"],
    false,
    'When you enter the computer password, you get a pop-up message that says,\n"The bedroom password is 135."'
  ),

  bedroom: new Room(
    "bedroom",
    "You've reached the holy grail! Look at that king sized bed!",
    [],
    true,
    "Congratulations! You win! Enjoy your nap!"
  ),

  livingRoom: new Room(
    "Living Room",
    "There is a roaring fire, a comfy sofa, and a giant deer head over the mantle.\nNext to the fireplace there is a recyling basket filled with newspaper like you found in the foyer.\nThere is a door to the kitchen.",
    [],
    false,
    ""
  ),

  kitchen: new Room(
    "kitchen",
    "Now this is a kitchen. Take a look at that pile of fruit on the counter\n You also notice a note on the refrigerator",
    ["fruit", "note with password: zork"],
    false,
    'You find a note on the fridge that says "The computer password is zork." Hope you can remember that!'
  ),
};
