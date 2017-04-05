
//targeted all popups
let popup1 = $('#popup1');
let popup2 = $('#popup2');
let popup3 = $('#popup3');
let popup4 = $('#popup4');
let popup5 = $('#popup5');

//target all Gameplay elements
let letterContainer = $('#letterContainer');
let popupContainer = $('#popupContainer');
let gameLettersContainer = $('#gameContainer');
let hangmanBox = $('#hangmanBox');

//popup2 buttons
let categorySelector = $('#selector');
let selectButton = $('#select');
let ownWordButton = $('#chooseOwnWord');
let createRandomButton = $('#randomGenerate');

//hide all gameGamplay elements while popups take user inputs
letterContainer.hide();
hangmanBox.hide();
popup2.hide();
popup3.hide();
popup4.hide();
popup5.hide();

//event listeners for popup1
ownWordButton.on('click', () => {popup1.hide(); popup2.slideDown()});
createRandomButton.on('click', () => {popup1.hide(); popup2.slideDown()});

//eventers listener for popup2
selectButton.on('click', chooseWordFromCategory);

//stored values for popup2 categories
let actors = ['Wesley Snipes','Steve Buscemi','Adam Sandler'];
let movies = [];
let rockStars = [];

//retrieve user selected category
function chooseWordFromCategory(){
      let category = categorySelector.val();
      switch (category) {
        case 'Actors':
          pickRandom(actors);
          closePop2();
          break;
        case 'Rock Stars':
          pickRandom(rockStars);
          closePop2();
          break;
        case 'Movies':
          pickRandom(movies);
          closePop2();
          break;
      }
}
//closes 2nd popup, opens 3rd. helper for above
function closePop2() {
  popup2.hide();
  popup3.slideDown();
}
let selectedWord = "";
//randomly select an element from the category and pass to creatGameSpaces
function pickRandom(array) {
  let randomNumber = Math.floor(Math.random() * array.length);
   selectedWord = array[randomNumber];
  }
//add even listener for popup3, draw gameBoard //the transition from popups to gameplay
$('#startbutton').on('click', drawGameBoard);

function drawGameBoard () {
  popup3.hide();
  creatGameSpaces(selectedWord);
  createletters();
  console.log(gameSpaces);
}


let gameSpaces = [];
//pass the chosen word(s) and create the game spaces
function creatGameSpaces(chosenword) {
  for (let i = 0; i < chosenword.length; i++){
    if(chosenword[i] === " ") {
      let emptySpace = $('<div class=gamespace></div>');
      gameLettersContainer.append(emptySpace);
      gameSpaces.push(emptySpace);
    }
    else {
      let gameLetter = $('<div class=gameletter></div>')
      gameSpaces.push(gameLetter);
      gameLettersContainer.append(gameLetter);
      gameLetter.html(chosenword[i]);
    }
  }
}

//MAKES LETTER TABLE
//loop through the alphabet and create a new Letter div for each
function createletters() {
  let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  for (let i = 0; i <= alphabet.length - 1; i++){
    let letter = $('<div class=letter></div>');
    letter.on('click', checkForLetters);
    letterContainer.append(letter);
    letter.html(alphabet[i]);
  }
    letterContainer.fadeIn()
    popupContainer.hide();
    hangmanBox.fadeIn();
    // hangmanBox.css('background-image', 'url(images/hangman1.png)');
}
//turn all images to jQuery
var hangman1 = $('#img1');
var hangman2 = $('#img2');
var hangman3 = $('#img3');
var hangman4 = $('#img4');
var hangman5 = $('#img5');
var hangman6 = $('#img6');

hangman1.show();





//checks if button-pushed letter matches any of the gamespace letters
//if yes it switches the hang switch true and hangman is not drawn
//if it doesn't match any, hang switch is triggered and counter increases to next image
var counter = 0;
function checkForLetters() {
  let hangSwitch = "";
  let pushedButtonLetter = $(this).text();
  $(this).off('click',checkForLetters);   //turn off click event listener on letter

  for (let i = 0; i < gameSpaces.length; i++) {
    if(pushedButtonLetter === gameSpaces[i].html().toUpperCase()) {
       gameSpaces[i].toggleClass('makevisible');
       hangSwitch = 'safe'
    }
  }
  if(!hangSwitch) {
    hangmanBox.append(imageArray[counter]);
    imageArray[counter].fadeIn();
    counter++;
  }
}
