// wait for the DOM to finish loading


var stringBoxes  = "#box0, #box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8";
var players = {"Player 1" : "X", "Player 2" : "O"};
var playerTurn = "X";
var ticTacToeBoard = [
  null, null, null,
  null, null, null,
  null, null, null
];

$(document).ready(function() {

  //resets game button
  function resetGame () {
    $(stringBoxes).empty(); //empties the text in each field
    playerTurn = players["Player 1"]; //sets the player to X
    ticTacToeBoard = [ //sets the array to null
      null, null, null,
      null, null, null,
      null, null, null
    ];
    $(stringBoxes).removeClass("styleO");
  }

  //reset button on click
  $("#resetButton").on("click", function (event) { //listen for click on button
    resetGame();  //reset the game when clicked
  });

  //user turn - record each click
  $(stringBoxes).on("click", function (event) { //listen for click on boxes
    userTurn(this); //play X on the clicked box, pass in what was clicked
    var hasWinner = checkForWinner(); //check if there is a winner and set equal to variable
    if (hasWinner !== true) { // if there is no winner
      computerTurn(); //play O
      checkForWinner(); // check if there is a winner
    }
  });

  // user turn
  function userTurn(elementClicked) { //pass in what was clicked 'this'
    playerTurn = "X"; //set user turn to X
    if ($(elementClicked).text() !== "") { //if the element clicked is not empty if true stop
      return;
    }
    $(elementClicked).append(playerTurn); //add X to element clicked
    var index = $(stringBoxes).index(elementClicked); //find index of box clicked
    ticTacToeBoard.splice(index, 1, playerTurn); //add X to the array with appropriate index
  }

  //computer turn
  function computerTurn() {
    //check if array is full, if true stop playing
    if (ticTacToeBoard[0] !== null && ticTacToeBoard[1] !== null && ticTacToeBoard[2] !== null && ticTacToeBoard[3] !== null && ticTacToeBoard[4] !== null && ticTacToeBoard[5] !== null && ticTacToeBoard[6] !== null && ticTacToeBoard[7] !== null &&ticTacToeBoard[8] !== null) {
      return;
    } else {
      playerTurn = "O"; //set user to O
      var computerChoice = Math.floor(Math.random() * 9); //generate random number between 0 and 9
      if (ticTacToeBoard[computerChoice] === null) { //if array of index of computer choice is null
        var selection = "#box"+computerChoice; //set box number to variable
        $(selection).append(playerTurn); //add O to appropriate box
        $(selection).addClass("styleO"); //adds a class to O that allows for different style
        ticTacToeBoard.splice(computerChoice, 1, playerTurn); //add O to the array with appropriate index
        return; // stop
      } else {
        computerTurn(); // if array of index is not null run the function again
      }
    }
  }

  //check for winner
  function checkForWinner() {
    var winningCombinations = [
      [0, 1, 2],  //horizontal win
      [3, 4, 5],  //horizontal win
      [6, 7, 8],  //horizontal win
      [0, 3, 6],  //vertical win
      [1, 4, 7],  //vertical win
      [2, 5, 8],  //vertical win
      [0, 4, 8],  //diagonal win
      [2, 4, 6]   //diagonal win
    ];

    for (var i = 0; i < winningCombinations.length; i++) { //loop the entire array
      var winningCombination = winningCombinations[i]; //for each array within array
      if ((ticTacToeBoard[winningCombination[0]] === ticTacToeBoard[winningCombination[1]]) && (ticTacToeBoard[winningCombination[0]] === ticTacToeBoard[winningCombination[2]]) && (ticTacToeBoard[winningCombination[0]] !== null) && (ticTacToeBoard[winningCombination[1]] !== null) && (ticTacToeBoard[winningCombination[2]] !== null)) {
        playerTurn = ticTacToeBoard[winningCombination[0]]; //check if winning combinations exist
        alert("Player " + playerTurn + " has won!"); //alert which user won
        resetGame(); //reset
        return true;
      }
    }
  }

});
