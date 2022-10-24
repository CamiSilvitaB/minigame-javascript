const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const up = document.querySelector('#up')
const left = document.querySelector('#left')
const right = document.querySelector('#right')
const down = document.querySelector('#down')


let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined ,
  y: undefined 
} 

window.addEventListener('load', setCanvasSize); // Esto me ayuda a que el juego inicie cuando ya haya cargado el documento HTML
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.8;
    } else {
      canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = (canvasSize / 10 -3); 
  
    startGame();

}
  
function startGame() {

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'center';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowColumn = mapRows.map(row => row.trim().split(''))

  game.clearRect (0, 0, canvasSize, canvasSize);

  mapRowColumn.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

        if(col == 'O') {
          if(!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
          }
          
        }

      game.fillText(emoji, posX, posY);
    });
  });  
  
  movePlayer()
  /*   for (let row = 1; row <= 10; row++) {

            for (let column = 1; column <= 10; column++) {
                game.fillText(emojis[mapRowColumn[row-1][column-1]], elementsSize * column , elementsSize * row);
            }

        }
 */
}

function movePlayer (){
  game.fillText (emojis['PLAYER'], playerPosition.x , playerPosition.y)
}

window.addEventListener('keydown', moveByKeys)
up.addEventListener('click', upMove)
left.addEventListener('click', leftMove)
right.addEventListener('click', rightMove)
down.addEventListener('click', downMove)

function moveByKeys (event){
  if (event.key == 'ArrowUp') upMove();
  else if (event.key == 'ArrowDown') downMove();
  else if (event.key == 'ArrowLeft') leftMove();
  else if (event.key == 'ArrowRight') rightMove();
}

function upMove(){
  if((playerPosition.y - elementsSize) < 0){
    console.log('Out')
  } else {
  playerPosition.y -= elementsSize;
  startGame()}
}
function leftMove(){
  if((playerPosition.x - elementsSize) < 0){
    console.log('Out')
  } else {
    playerPosition.x -= elementsSize;
    startGame()}
}
function rightMove(){
  if((playerPosition.x + elementsSize) > canvasSize){
    console.log('Out')
  } else {
  playerPosition.x += elementsSize;
  startGame()}
}
function downMove(){
  if((playerPosition.y + elementsSize) > canvasSize){
    console.log('Out')
  } else {
  playerPosition.y += elementsSize;
  startGame()}
}