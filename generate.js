let randomForm = document.getElementById("random-form");
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

let words = [];
let numWords = 1;
/*
randomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  drawRandomSearch();
});

customForm.addEventListener("submit", (e) => {
  e.preventDefault();

  drawCustomSearch();
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

  square(LX, TY, SIZE);
  noFill();

  textAlign(CENTER, CENTER);
  textSize(52);
  fill(200);
  stroke(0);
  text("Words To Find:", ((WIDTH - RX) / 2) + RX, 70);
}

// function drawCustomSearch(){
//
// }
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
