const WIDTH = 7;
const HEIGHT = 6;
 
let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
 

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}
 

 
 function makeHtmlBoard() {
 
   const board = document.getElementById('board');
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) { 
     let headCell = document.createElement("td"); 
     headCell.setAttribute("id", x); 
     top.append(headCell); 
   }
   board.append(top);
 
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr"); 
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`); 
       row.append(cell); 
     }
     board.append(row);
   }
 }
 
 function findSpotForCol(x) {
   for(let y = HEIGHT - 1; y >= 0; y--){
     if(!board[y][x]){
       return y;
     }
   }
   return null;
 }
 

 
 function placeInTable(y, x) {
   const piece = document.createElement('div');
   piece.classList.add('piece');
   piece.classList.add(`p${currPlayer}`);
   piece.style.top = -50 * (y + 2);

   const cell = document.getElementById(`${y}-${x}`);
   cell.append(piece);
   const ballSFX = document.getElementById('ballSFX');
  ballSFX.play();
  ballSFX.volume = 0.15;


 }
 
 
function endGame(msg) {
  const victory = document.getElementById('victory');
  victory.play();
  victory.volume = 0.15;
  alert(msg);
   
 }
 

 
 function handleClick(evt) {

  //break out of handleClick if game has won
  if (checkForWin()) {
    alert(`Player ${currPlayer} is victorious!`);
    return;
  }

   const x = +evt.target.id;
 
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   board[y][x] = currPlayer;
   placeInTable(y, x);
 

   if (checkForWin()) {
     return endGame(`Player ${currPlayer} is victorious!`);
   }
 

   if(board.every(row => row.every(cell => cell))) {
     return endGame('Tie!')
   }
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 

 
 function checkForWin() {
   function _win(cells) {
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 

function play(){
  let audio = document.getElementById('feverMusic');
  audio.volume = 0.15;
  return audio.paused ? audio.play() : audio.pause();
}


 makeBoard();
 makeHtmlBoard();


 