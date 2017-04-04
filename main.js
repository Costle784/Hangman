console.log('connected');

let popup1 = $('#popup1');
let popup2 = $('#popup2');
let popup3 = $('#popup3');
let popup4 = $('#popup4');
let popup5 = $('#popup5');
let letterContainer = $('#letterContainer');
let popupContainer = $('#popupContainer');
let gameBoard = $('#gameBoard');

$('#chooseOwnWord').on('click', () => {popup1.hide(); popup2.slideDown()});
$('#randomGenerate').on('click', () => {popup1.hide(); popup2.slideDown()});
$('#startbutton').on('click', drawGameBoard);

letterContainer.toggleClass('letterContainer')
gameBoard.hide();
popup2.hide();
popup3.hide();
popup4.hide();
popup5.hide();

function drawGameBoard () {
  createletters();
  // createGameSpaces();
}

function createletters() {
  let letterArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  for (let i = 0; i <= 25; i++){
    let div = $('<div class=letter></div>')
    letterContainer.append(div);
    div.html(letterArray[i]);
  }
    letterContainer.toggleClass('letterContainer');
    popupContainer.hide();
    gameBoard.show();
}

let selector = $('#selector');
let selectButton = $('#select');

selectButton.on('click', chooseWordFromCategory);

let actors = ['Wesley Snipes','Steve Buscemi','Adam Sandler'];
let movies = [];
let rockStars = [];


function chooseWordFromCategory(){
      let category = selector.val();
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

function closePop2() {
  popup2.hide();
  popup3.slideDown();
}

function pickRandom(array) {
  let randomNumber = Math.floor(Math.random() * array.length);
  let selectedWord = array[randomNumber];
  creatGameSpaces(selectedWord);
}


function creatGameSpaces(word) {
  let gameLettersContainer = $('#gameContainer');
  for (let i = 0; i < word.length; i++){
    console.log(word[i]);
    debugger;
    if(word[i] === " ") {
      let div = $('<div class=gamespace></div>');
      gameLettersContainer.append(div);
    }
    else {
      let div = $('<div class=gameletter></div>')
      gameLettersContainer.append(div);
      div.html(word[i]);
    }
  }
}
