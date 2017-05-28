//why can't I see the letter event listeners in the console??


//Step 1. targeted all pre written html elements w/ jQuery
//  -popups, containers, buttons, hangman images, header
//Step 2. hide all unused elements
//Step 3. Add event listeners to all buttons on popups and add all sounds;
//step 4. make 2 paths available - choose own word or randomly generate
//  -path 1 takes user input and generates word
// -path 2 generates a random one from categories
// On 'start button, both draw the screen creating new div dom elements for each letter in the word and push to an array.
//also all new user letters are created
//each clicked letter will loop through the game dom element letters, and if they match, the element will become visible
// it will then check for the win. if yes, popup displays asking if you want to play again. checks by comparing the 'makevisible' class
//if no letters are found, it will fade in new hangman image and check if it's game over. if yes, pop up to reset.

//targeted all popups
let popupWelcome = $('#popup1');
let popupCategorySelector = $('#popup2');
let popupStart = $('#popup3');
let popupGameOver = $('#popup4');
let popupYouWin = $('#popup5');
let popupChooseOwnWord = $('#popup6');

//targeted all Container elements
let header = $('header');
let hangmanBox = $('#hangmanBox');
let gameLettersContainer = $('#gameContainer');
let letterContainer = $('#letterContainer');
let popupContainer = $('#popupContainer');

//targeted buttons
let categorySelector = $('#selector');
let categorySelectButton = $('#select');
let ownWordButton = $('#chooseOwnWord');
let createRandomButton = $('#randomGenerate');
let losePlayAgainButton = $('#playagain');
let winPlayAgainButton = $('#playagain1');

let submitOwnWordButton = $('#submit');
let userInput = $('#input');

let startButton = $('#startbutton');

//target all hangman images // hidden by default
let hangman1 = $('#img1');
let hangman2 = $('#img2');
let hangman3 = $('#img3');
let hangman4 = $('#img4');
let hangman5 = $('#img5');
let hangman6 = $('#img6');
let hangman7 = $('#img7');
let hangmanArray = [hangman1, hangman2, hangman3, hangman4, hangman5, hangman6, hangman7];

//add sounds
let background = new Audio('./Audio/background.wav');
let select = new Audio('./Audio/select.mp3');
let click = new Audio('./Audio/Click.mp3');
let wrongAnswer = new Audio('./Audio/wronganswer.mp3');
let correct = new Audio('./Audio/correct.mp3');
let winGame = new Audio('./Audio/wingame.mp3');
let loseGame = new Audio('./Audio/losegame.mp3');

background.play();
background.addEventListener('ended', () => {
  this.currentTime = 0;
  this.play;
});


//hide all gameGamplay and unused popup elements
letterContainer.hide();
hangmanBox.hide();
popupCategorySelector.hide();
popupStart.hide();
popupGameOver.hide();
popupYouWin.hide();
popupChooseOwnWord.hide();

//event listeners for all popup buttons
ownWordButton.on('click', () => {
  popupWelcome.hide();
  popupChooseOwnWord.slideDown();
  select.play()
});
createRandomButton.on('click', () => {
  popupWelcome.hide();
  popupCategorySelector.slideDown();
  select.play()
});

//popup 2 buttons
categorySelectButton.on('click', assignRandomWord);
submitOwnWordButton.on('click', assignOwnWord);

startButton.on('click', drawGameBoard);

losePlayAgainButton.on('click', resetGame);
winPlayAgainButton.on('click', resetGame);

let selectedWord = "";

function assignOwnWord() {
  selectedWord = userInput.val()
  select.play();
  popupChooseOwnWord.hide();
  popupStart.slideDown();
}

let actors = ['Wesley Snipes', 'Steve Buscemi', 'Adam Sandler', 'Al Pacino', 'John Goodman'];
let movies = ['the Big Lebowski', 'Rudy', 'Scarface', 'Mrs Doubtfire', 'Speed'];
let rockStars = ['Billy Idol', 'Dave Grohl', 'David Bowie', 'Chuck Berry', 'Steven Tyler'];

//retrieve user selected category
function assignRandomWord() {
  select.play();
  let category = categorySelector.val();
  switch (category) {
    case 'Actors':
      pickRandom(actors);
      popupCategorySelector.hide();
      popupStart.slideDown();
      break;
    case 'Rock Stars':
      pickRandom(rockStars);
      popupCategorySelector.hide();
      popupStart.slideDown();
      break;
    case 'Movies':
      pickRandom(movies);
      popupCategorySelector.hide();
      popupStart.slideDown();
      break;
  }
}

//randomly select an element from the category
function pickRandom(array) {
  let randomNumber = Math.floor(Math.random() * array.length);
  selectedWord = array[randomNumber];
}


function drawGameBoard() {
  popupStart.hide();
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
  for (let i = 0; i < selectedWord.length; i++) {
    if(selectedWord[i] === " ") {
      let emptySpace = $('<div class=gamespace></div>');
      gameLettersContainer.append(emptySpace);
      gameSpaces.push(emptySpace);
    }else
    {
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
  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  alphabet.forEach((letter) => {
    let letterDiv = $('<div class=letter></div>');
    letterDiv.on('click', checkForLetters);
    letterDiv.on('mouseover', () => {
      click.play();
    });
    letterContainer.append(letterDiv);
    letterDiv.html(letter);
  });
}

//checks if button-pushed letter matches any of the gamespace letters
//if yes it switches the hang switch true and hangman is not drawn
//if it doesn't match any, hang switch is triggered and counter increases to next image
let counter = 1;

function checkForLetters() {
  select.play();
  let hangSwitch = false;
  let pushedButtonLetter = $(this).text();
  $(this).css('background', 'grey'); // grey out the letter square
  $(this).off('click', checkForLetters); //turn off click event listener on letter
  for (let i = 0; i < gameSpaces.length; i++) {
    if(pushedButtonLetter === gameSpaces[i].html().toUpperCase()) {
      correct.play();
      gameSpaces[i].addClass('makevisible');  //if it matches make it visible
      hangSwitch = true;
    }
  }
  checkWin();
  if(!hangSwitch){
    wrongAnswer.play();
    hangmanArray[counter].fadeIn();
    counter++;
    checkGameOver();
  }
}

function checkGameOver() {
  if(counter === 7){
    loseGame.play();
    popupGameOver.slideDown();
    gameSpaces.forEach((letter) => {
      letter.addClass('makevisible')
    })
  }
}

function checkWin() {
  let hasWon = gameSpaces
    .filter((letter) => {
      return $(letter).text() !== ''
    })
    .every((el) => {
        return $(el).hasClass('makevisible')
    });
  if(hasWon) {
    winGame.play();
    popupYouWin.show();
  }
}

function resetGame() {
  select.play();
  letterContainer.hide();
  hangmanBox.hide();
  popupCategorySelector.hide();
  popupStart.hide();
  popupGameOver.hide();
  popupYouWin.hide();
  header.hide();
  popupWelcome.slideDown();
  counter = 1;
  hangmanArray.forEach((img) => {
      img.hide()
  });
  gameLettersContainer.empty();
  letterContainer.empty();
  gameSpaces = [];
}
