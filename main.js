//why can't I see the letter event listeners in the console??


//Step 1. targeted all pre loaded html elements w/ jQuery
  //  -popups, containers, buttons, hangman images, header
//Step 2. hide all unused elements
//Step 3. Add event listeners to all buttons on popups
//step 4. make 2 paths available - choose own word or randomly generate
//  -path 1 takes user input and generates word
// -path 2 generates a random one from categories
// On 'start button, both draw the screen creating new div dom elements for each letter in the word and push to an array.
    //also all new user letters are created
//each clicked letter will loop through the game dom element letters, and if they match, the element will become visible
// it will then check for the win. if yes, popup displays asking if you want to play again. checks by comparing the 'makevisible' class
//if no letters are found, it will fade in new hangman image and check if it's game over. if yes, pop up to reset.

//targeted all popups
let popup1 = $('#popup1');
let popup2 = $('#popup2');
let popup3 = $('#popup3');
let popup4 = $('#popup4');
let popup5 = $('#popup5');
let popup6 = $('#popup6');
let popup7 = $('#popup7');

//targeted all Container elements
let header = $('header');
let hangmanBox = $('#hangmanBox');
let gameLettersContainer = $('#gameContainer');
let letterContainer = $('#letterContainer');
let popupContainer = $('#popupContainer');

//targeted buttons
let categorySelector = $('#selector');
let selectButton = $('#select');
let ownWordButton = $('#chooseOwnWord');
let createRandomButton = $('#randomGenerate');
let losePlayAgainButton = $('#playagain');
let winPlayAgainButton = $('#playagain1');
let startButton = $('#startbutton');
let submitButton = $('#submit');
let userInput = $('#input');
let ownStart = $('#startbutton1')

//target all hangman images // hidden by default
let hangman1 = $('#img1');
let hangman2 = $('#img2');
let hangman3 = $('#img3');
let hangman4 = $('#img4');
let hangman5 = $('#img5');
let hangman6 = $('#img6');
let hangman7 = $('#img7');
let hangmanArray = [hangman1,hangman2,hangman3,hangman4,hangman5,hangman6,hangman7];

//add sounds
let background = new Audio('./Audio/background.wav');
let select = new Audio('./Audio/select.mp3');
let click = new Audio('./Audio/Click.mp3');
let wrongAnswer = new Audio('./Audio/wronganswer.mp3');
let correct = new Audio('./Audio/correct.mp3');
let winGame = new Audio('./Audio/wingame.mp3');
let loseGame = new Audio('./Audio/losegame.mp3');

background.play();
background.addEventListener('ended', function(){
   this.currentTime = 0;
      this.play();
   });


//hide all gameGamplay and unused popup elements
letterContainer.hide();
hangmanBox.hide();
popup2.hide();
popup3.hide();
popup4.hide();
popup5.hide();
popup6.hide();
popup7.hide();

//event listeners for all popup buttons
ownWordButton.on('click', () => {popup1.hide(); popup6.slideDown();select.play()});
createRandomButton.on('click', () => {popup1.hide(); popup2.slideDown();select.play()});
selectButton.on('click', chooseWordFromCategory);
losePlayAgainButton.on('click',resetGame);
winPlayAgainButton.on('click',resetGame);
startButton.on('click', drawGameBoard);
submitButton.on('click', ownWordStart);
ownStart.on('click', drawOwnWordGameBoard);



function ownWordStart() {
  select.play();
  popup6.hide();
  popup7.slideDown();
}

function drawOwnWordGameBoard() {      //called by start button
  select.play();
  popup7.hide();
  creatGameSpaces(userInput.val());
  createletters();
  letterContainer.slideDown()
  hangmanBox.slideDown();
  hangman1.slideDown();
  header.fadeIn();
}


let actors = ['Wesley Snipes','Steve Buscemi','Adam Sandler','Al Pacino','John Goodman'];
let movies = ['the Big Lebowski','Rudy', 'Scarface','Mrs Doubtfire','Speed'];
let rockStars = ['Billy Idol', 'Dave Grohl', 'David Bowie', 'Chuck Berry', 'Steven Tyler' ];

//retrieve user selected category
function chooseWordFromCategory(){
      select.play();
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

function drawGameBoard() {      //called by start button
  select.play();
  popup3.hide();
  creatGameSpaces(selectedWord);
  createletters();
  letterContainer.slideDown()
  hangmanBox.slideDown();
  hangman1.slideDown();
  header.fadeIn();
}

let gameSpaces = [];
//pass the chosen word(s) and create the game spaces
function creatGameSpaces(selectedWord) {
  for (let i = 0; i < selectedWord.length; i++){
    if(selectedWord[i] === " ") {
      let emptySpace = $('<div class=gamespace></div>');
      gameLettersContainer.append(emptySpace);
      gameSpaces.push(emptySpace);
    }
    else {
      let gameLetter = $('<div class=gameletter></div>')
      gameSpaces.push(gameLetter);
      gameLettersContainer.append(gameLetter);
      gameLetter.html(selectedWord[i]);
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
      letter.on('mouseover', () => {click.play(); console.log('mouseover')});
      letterContainer.append(letter);
      letter.html(alphabet[i]);
    }
}
//checks if button-pushed letter matches any of the gamespace letters
//if yes it switches the hang switch true and hangman is not drawn
//if it doesn't match any, hang switch is triggered and counter increases to next image
let counter = 1;
function checkForLetters() {
  console.log('clicked');
  debugger;
  select.play();
  let hangSwitch = false;
  let pushedButtonLetter = $(this).text();
  $(this).css('background','grey');        // grey out the letter square
  $(this).off('click',checkForLetters);   //turn off click event listener on letter
  for (let i = 0; i < gameSpaces.length; i++) {
    if(pushedButtonLetter === gameSpaces[i].html().toUpperCase()) {
      correct.play();
       gameSpaces[i].addClass('makevisible');
       hangSwitch = true;
    }
  }
  checkWin();
  if(!hangSwitch) {
    wrongAnswer.play();
    hangmanArray[counter].fadeIn();
    counter++;
    console.log(counter);
    checkGameOver();
  }
}

function checkGameOver() {
  if (counter === 7) {
    loseGame.play();
    popup4.slideDown();
  }
}
function checkWin() {
  let hasWon = gameSpaces
    .filter((el) => {
      return $(el).text() !== ''
    })
    .every((el) => {
      return $(el).hasClass('makevisible')
    });
  if(hasWon){
    winGame.play();
    popup5.show();
  }
}
function resetGame() {
  select.play();
  letterContainer.hide();
  hangmanBox.hide();
  popup2.hide();
  popup3.hide();
  popup4.hide();
  popup5.hide();
  popup1.slideDown();
  counter = 0;
  hangmanArray.forEach( (img) => {img.hide()});
  gameLettersContainer.empty();
  letterContainer.empty();
  header.hide();
}
