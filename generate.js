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
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let words = [];
let numWords = 1;
let maxLength = 0;
let gameGrid = [];
let usedWords = [];
// Valid directions are Right, Up, Down, Up Right, Down Right
let directions = ["R", "U", "D", "UR", "DR"];

let searchReady = false;
/*
randomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  drawRandomSearch();
});
*/

function setup(){
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas-container");
}

function draw(){
  background(100);
  stroke(200);
  strokeWeight(3);
  fill(160);
  square(LX, TY, SIZE);

  textAlign(CENTER, CENTER);
  textSize(52);
  fill(200);
  stroke(0);
  text("Words To Find:", ((WIDTH - RX) / 2) + RX, 70);

  if (searchReady){
    drawSearch();
  }
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
*  @return  boolean   true if successful, false otherwise
*/
function placeWord(word){
  // Declare variables to store if and where word can be placed
  var good = false;
  var goodDirection = null;
  var goodX = null;
  var goodY = null;

  // If in corner, only check corners
  // Otherwise, loop up to 100 times to try place word in grid
  if (word.length == maxLength) {
    // Corners TL, BL, TR, BR
    // corners contains all corner x and y positions, along with their possible directions
    corners = [["R", 0, 0],
               ["D", 0, 0],
               ["DR", 0, 0],
               ["U", 0, maxLength],
               ["R", 0, maxLength],
               ["UR", 0, maxLength],
               ["D", maxLength, 0],
               ["U", maxLength, maxLength]];

    for (var i = 0; i < corners.length; i++) {
      direction = corners[i][0];
      x = corners[i][1];
      startX = x;
      y = corners[i][2];
      startY = y;

      // check every letter of word against grid
      for (var j = 0; j < word.length; j++) {
        if (x == maxLength || y == maxLength || y < 0) {
          good = false;
          break;
        } else if (word[j] != gameGrid[y][x] && gameGrid[y][x] != "_") {
          good = false;
          break;
        } else {
          good = true;
          // Move to next position based on direction
          switch(direction){
            case "R":
              x++;
              break;
            case "U":
              y--;
              break;
            case "D":
              y++;
              break;
            case "UR":
              x++;
              y--;
              break;
            case "DR":
              y++;
              x++;
              break;
            default:
              break;
          }
        }
      }

      // If the word can be placed in the grid, break
      if (good) {
        break;
      }
    }
  } else {
    for (var i = 0; i < 100; i++) {
      // Randomly choose starting x and y position for word, as well as thr direction
      var x = Math.floor(Math.random() * maxLength);
      startX = x;
      var y = Math.floor(Math.random() * maxLength);
      startY = y;
      var direction = directions[Math.floor(Math.random() * directions.length)];

      // Check every letter in the word agaisnt the grid
      for (var j = 0; j < word.length; j++) {
        if (x >= maxLength || y >= maxLength || y < 0){
          good = false;
          break;
        } else if (word[j] != gameGrid[y][x] && gameGrid[y][x] != "_") {
          good = false;
          break;
        } else {
          good = true;
          // Move to next position based on direction
          switch(direction){
            case "R":
              x++;
              break;
            case "U":
              y--;
              break;
            case "D":
              y++;
              break;
            case "UR":
              x++;
              y--;
              break;
            case "DR":
              y++;
              x++;
              break;
            default:
              break;
          }
        }
      }

      // If a valid position is found
      if (good) {
        break;
      }
    }
  }

    // If loop has exited without valid word position
    if (!good) {
      return false;
    }

    // Reset x and y positions to original x and y
    // Place each letter of the word in the grid
    x = startX;
    y = startY;
    for (var i = 0; i < word.length; i++) {
      // Move to next position based on direction
      gameGrid[y][x] = word[i];
      switch(direction){
        case "R":
          x++;
          break;
        case "U":
          y--;
          break;
        case "D":
          y++;
          break;
        case "UR":
          x++;
          y--;
          break;
        case "DR":
          y++;
          x++;
          break;
        default:
          break;
      }
    }

    return true;
}

function drawSearch(){
  // get box size
  var boxSize = SIZE/maxLength;
  for (var i = 0; i < maxLength; i++) {
    for (var j = 0; j < maxLength; j++) {
      stroke(200);
      strokeWeight(3);
      noFill();
      square(LX + (j * boxSize), TY + (i * boxSize), boxSize);


      textAlign(CENTER, CENTER);
      textSize(52);
      fill(200);
      stroke(0);
      text(gameGrid[i][j], LX + (j * boxSize) + (boxSize/2), TY + (i * boxSize) + (boxSize/2));
    }
  }
}

// Add submit event listener to custom form
customForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Add all words into an array
  for (var i = 1; i < numWords + 1; i++) {
    word = document.getElementById("word" + i).value;
    if (word.length > maxLength) {
      maxLength = word.length;
    }
    words.push(word.toUpperCase());
  }

  gameGrid = makeGrid();

  // Attempt to add all words into the grid
  for (var i = 0; i < words.length; i++) {
    // Add the word
    // If successful, add word to usedWords list
    if (placeWord(words[i])) {
        usedWords.push(words[i]);
    }
  }

  // Replaces all remaining _ characters with a random letter
  for (var i = 0; i < maxLength; i++) {
    for (var j = 0; j < maxLength; j++) {
      if (gameGrid[i][j] == "_"){
        gameGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  searchReady = true;

  console.log(gameGrid);

  sections = document.getElementsByClassName("front-container");
  for (i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }

  front = document.getElementsByClassName("front");
  for (var i = 0; i < front.length; i++) {
    front[i].style.height = "0";
  }
  document.getElementById("canvas-container").style.display = "flex";
});

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
