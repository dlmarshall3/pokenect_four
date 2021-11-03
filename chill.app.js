/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
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

/*First, we are selecting the table with an id of "board," which is going to receive all of the rows/data. Next, we create a variable "top" which will be the top row, given an id of "column-top", used to listen for clicks/drop the pieces. From there, we initiate a loop where we want to create X numbers of data cells, X being the width of the board, to put into the top row. The setAttribute will create an id for each data cell according to the iteration. We end this part of the function by adding the entire "top" section, data cells and all, to the board. */

 
   // TODO: add comment for this code
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
 
 /* The last part of the function will create the remaining rows for the game. The first for loop is creating Y number of rows ('tr'), which is determined by the global Y variable above. Once a row is created, we then have a second loop where, based off of X, or width, we are creating a data cell ('td') that's going to be added to the row and get an id based off of the Y-X format. That is, the first row's ids would be 0-0, 0-1, 0-2, etc. Goes horizontally-vertically. Once the second loop is completed (going through X times), the entire row is added to the board, and the first loop runs again.*/

 
 
 function findSpotForCol(x) {
   for(let y = HEIGHT - 1; y >= 0; y--){
     if(!board[y][x]){
       return y;
     }
   }
   return null;
 }

/* This was the part of the logic I didn't really understand. */

 
 
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

/* This function is going to be utilized down the road to place a piece according to the click Event Listener. First, we're going to create a variable for the game piece by creating a DIV element. In order to style it correctly, we'll give it a class of "piece" and "p${currPlayer}" to make sure each piece corresponds to the correct player. I'm not necessarily sure what the piece.style.top does, as it didn't make a visible difference in my code. From there, we want to make sure it's being placed in the proper cell, so we're going to add it to the DIV with the corresponding ID based on the event listener below. *My extra code* grabs the ballSFX .wav file from the HTML and plays it every time this happens at 15% volume. */

 
function endGame(msg) {
  const victory = document.getElementById('victory');
  victory.play();
  victory.volume = 0.15;
  alert(msg);
 }

 /* This function will be executed down below whenever the game ends with a victory or a tie. First, we're going to play the "victory" .wav file at 15% volume, followed by executing an alert with a message. Simply depends on which result we get! */ 
 
 
 
 
 
 
 
 
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
  
  //break out of handleClick if game has won
  if (checkForWin()) {
    alert(`Player ${currPlayer} is victorious!`);
    return;
  } 
  
  // get x from ID of clicked cell
   const x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   
   board[y][x] = currPlayer;
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} is victorious!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame

   if(board[0].every(cell => cell)){
     return endGame('Tie!')
   }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
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
 

 //play/pause for the music
function play(){
  let audio = document.getElementById('chillMusic');
  audio.volume = 0.25;
  return chillMusic.paused ? chillMusic.play() : chillMusic.pause();
}


 makeBoard();
 makeHtmlBoard();


 