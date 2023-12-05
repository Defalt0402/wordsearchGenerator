// let randomForm = document.getElementById("random-form");
let customForm = document.getElementById("custom-form");
let WIDTH = 1754;
let HEIGHT = 1240;
// Define coords of top, left, bottom and right of grid
let LX = 20;
let TY = 20;
let RX = 1220;
let BY = 1220;
// Define side size of grid
let SIZE = 1200;

// Define attributes of words for search
let words = [];
let numWords = 1;
let maxLength = 0;
let gameGrid = [];
// Valid directions are Right, Up, Down, Up Right, Down Right
let directions = ["R", "U", "D", "UR", "DR"];
/*
randomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  drawRandomSearch();
});
*/

customForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("1");
  for (var i = 1; i < numWords + 1; i++) {
    word = document.getElementById("word" + i).value;
    if (word.length > maxLength) {
      maxLength = word.length;
    }
    words.push(word);
  }

  drawCustomSearch();
});

function setup(){
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas-container");
}

function draw(){
  background(100);
  stroke(200);
  strokeWeight(3);

  square(LX, TY, SIZE);
  noFill();

  textAlign(CENTER, CENTER);
  textSize(52);
  fill(200);
  stroke(0);
  text("Words To Find:", ((WIDTH - RX) / 2) + RX, 70);
}

// Creates game grid array of maxLength x maxLength
function makeGrid() {
  var arr = [];
    for(i = 0; i < maxLength; i++) {
        arr[i] = Array.from('_'.repeat(maxLength));
    }
    return arr;
}

/* Attempts to place a word into the grid
*  @param   word  The word to be placed in the grid
*  @param   corner    A boolean value that determines if the value should be placed in a corner
*  @return  boolean   True if successful, False otherwise
*/
function placeWord(word, corner){
  var good = False;
  var goodDirection = null;
  var goodX = null;
  var goodY = null;
  for (var i = 0; i < 100; i++) {
    if (corner) {

    } else {
      var x = Math.floor(Math.random() * maxLength);
      var y = Math.floor(Math.random() * maxLength);
      var direction = directions[Math.floor(Math.random() * directions.length)];
      for (var j = 0; j < word.length; j++) {
        if (word[j] != gameGrid[x][y] || word[j] != "_") {
          break;
        } else {
          switch(direction){
            case "R":
            case "U":
            case "D":
            case "UR":
            case "DR":
            default:
            break;
          }
        }
      }
    }
}

function drawCustomSearch(){
  gameGrid = makeGrid();
  console.log(grid);
  for (word in words) {
    if (word.length = maxLength) {
      // Try place in
    }
  }
}
//
// function drawRandomSearch(){
//
// }

function showSection(evt, name) {
  var i, sections;

  // Get all elements with class="loginSections" and hide them
  sections = document.getElementsByClassName("front-container");
  for (i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(name).style.display = "flex";

}

function addWordInput() {
  numWords++;

  var newInput = document.createElement('input');
  newInput.id = 'word' + numWords;
  newInput.type = 'text';
  newInput.name = 'word';
  newInput.placeholder = 'Enter a word';

  document.getElementById("word" + (numWords - 1)).after(newInput);


  // document.getElementById("wordInputs").innerHTML += '<input id="word' + numWords + '" type="text" name="word" placeholder="Enter a word">';
}

function removeWordInput(){
  document.getElementById("word" + numWords).remove();
  numWords--;
}
