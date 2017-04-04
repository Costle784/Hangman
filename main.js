
//targeted all jQuery popups
let popup1 = $('#popup1');
let popup2 = $('#popup2');
let popup3 = $('#popup3');
let popup4 = $('#popup4');
let popup5 = $('#popup5');

//targeted all jQuery Gameplay elements
let letterContainer = $('#letterContainer');
let popupContainer = $('#popupContainer');
let hangmanContainer = $('#hangmanbox');
let categorySelector = $('#selector');
let selectButton = $('#select');
let hangmanBox = $('#hangmanBox');

//button event listeners for popup1//
$('#chooseOwnWord').on('click', () => {popup1.hide(); popup2.slideDown()});
$('#randomGenerate').on('click', () => {popup1.hide(); popup2.slideDown()});

//hide all gameGamplay elements while popups take user inputs
letterContainer.toggleClass('letterContainer')
hangmanBox.hide();
popup2.hide();
popup3.hide();
popup4.hide();
popup5.hide();

//add event listener for popup2
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
//randomly select an element from the category and pass to creatGameSpaces
var selectedWord = "";

function pickRandom(array) {
  let randomNumber = Math.floor(Math.random() * array.length);
   selectedWord = array[randomNumber];
  creatGameSpaces(selectedWord);
}
//add even listener for popup3, draw gameBoard
$('#startbutton').on('click', drawGameBoard);
function drawGameBoard () {
  popup3.hide();
  hangmanBox.fadeIn();
  createletters();
}
function closePop2() {
  popup2.hide();
  popup3.slideDown();
}

let letterArray = [];
function creatGameSpaces(word) {
  let gameLettersContainer = $('#gameContainer');
  for (let i = 0; i < word.length; i++){
    if(word[i] === " ") {
      let div = $('<div class=gamespace></div>');
      gameLettersContainer.append(div);
      letterArray.push(div);
    }
    else {
      let div = $('<div class=gameletter></div>')
      gameLettersContainer.append(div);
      div.html(word[i]);
      letterArray.push(div);
    }
  }
}

function createletters() {
  let letterArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  for (let i = 0; i <= 25; i++){
    let div = $('<div class=letter></div>')
    div.on('click',checkForLetters);
    letterContainer.append(div);
    div.html(letterArray[i]);
  }
    letterContainer.toggleClass('letterContainer');
    popupContainer.hide();
}

function checkForLetters() {
  console.log(this);
  $(this).removeEventListener('click', checkForLetters());
  for (var i = 0; i < letterArray.length; i++) {
    if(letterArray[i].html().toUpperCase() === this.innerHTML) {
       letterArray[i].toggleClass('makevisible');
    }
  }
}
