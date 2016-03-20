// wait for the DOM to finish loading


var stringBoxes  = "#box0, #box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8";
var players = {"Player 1" : "X", "Player 2" : "O"};
var playerTurn = "X";
var turnCount = 0;
var ticTacToeBoard = [
  null, null, null,
  null, null, null,
  null, null, null
];

  $(document).ready(function() {

    //resets game button
    function resetGame () {
      $(stringBoxes).empty();
      playerTurn = players["Player 1"];
      turnCount = 0;
      ticTacToeBoard = [
        null, null, null,
        null, null, null,
        null, null, null
      ];
    }
 //reset button on click
    $("#button").on("click", function (event) {
      resetGame();
    });

    //record each click
    $(stringBoxes).on("click", function (event) {
      if ($(this).text() !== "") {
        return;
      }
      $(this).append(playerTurn);
      var index = $(stringBoxes).index(this);
      ticTacToeBoard.splice(index, 1, playerTurn);
      turnCount += 1;
      if(turnCount % 2 === 0 ) {
        playerTurn = players["Player 1"];
      } else {
        playerTurn = players["Player 2"];
      }
      checkForWinner(ticTacToeBoard);

    });

    //computer turn
    function computerTurn () {
      var computerTurn = Math.floor((Math.random() * 8) + 0); //generate random number between 0 and 8
      if (ticTacToeBoard[computerTurn] === null) {
        ticTacToeBoard.splice(computerTurn, 1, players["Player 2"]);
        turnCount += 1;
      } else {
        computerTurn();
      }
    }


    //check for winner
    function checkForWinner(ticTacToeBoard) {
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

      for (var i = 0; i < winningCombinations.length; i++) {
        var winningCombination = winningCombinations[i];
        if ((ticTacToeBoard[winningCombination[0]] === ticTacToeBoard[winningCombination[1]]) && (ticTacToeBoard[winningCombination[0]] === ticTacToeBoard[winningCombination[2]]) && (ticTacToeBoard[winningCombination[0]] !== null) && (ticTacToeBoard[winningCombination[1]] !== null) && (ticTacToeBoard[winningCombination[2]] !== null)) {
          playerTurn = ticTacToeBoard[winningCombination[0]];
          alert("Player " + playerTurn + " has won!");
          resetGame();
        }
      }
    }

});
