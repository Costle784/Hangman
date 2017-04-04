console.log('connected');

let popup1 = $('#popup1');
let popup2 = $('#popup2');
let popup3 = $('#popup3');
let popup4 = $('#popup4');
let popup5 = $('#popup5');
let letterContainer = $('#letterContainer');
let popupContainer = $('#popupContainer');
let gameBoard = $('#gameBoard');


$('#chooseWord').on('click', openPopup2);
$('#randomGenerate').on('click', openPopup2);
$('#submit').on('click', openPopup3)
$('#startbutton').on('click',drawGame)

letterContainer.toggleClass('letterContainer')
gameBoard.hide();
popup2.hide();
popup3.hide();
popup4.hide();
popup5.hide();

function openPopup2() {
  popup1.hide();
  popup2.slideDown();
}

function openPopup3() {
  popup2.hide();
  popup3.slideDown();
}

function openPopup4() {
  popup3.hide();
  popup4.slideDown();
}

function drawGame() {
  popup3.slideUp();
  createletters();
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

selectButton.on('click', getCategoryName('#selector'));


function getCategoryName(el){
    console.log($(el.val));
}
