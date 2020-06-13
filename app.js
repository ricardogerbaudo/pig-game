/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, isGamePlaying, winningScore;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isGamePlaying) {
    var dice1 = Math.floor(Math.random(6) * 6) + 1;
    var dice2 = Math.floor(Math.random(6) * 6) + 1;

    document.querySelector(".dice-1").style.display = "block";
    document.querySelector(".dice-2").style.display = "block";

    document.querySelector(".dice-1").src = "dice-" + dice1 + ".png";
    document.querySelector(".dice-2").src = "dice-" + dice2 + ".png";

    if (dice1 + dice2 === 12) {
      console.log(
        "Both dices are 6, Player " + (activePlayer + 1) + " loses all points."
      );
      roundScore = 0;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      scores[activePlayer] = 0;
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      console.log(
        "At least one of the dices are 1, so Player " +
          (activePlayer + 1) +
          "loses current score."
      );
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isGamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if there is a winner
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";

      document.querySelector(".dice-1").style.display = "none";
      document.querySelector(".dice-2").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      isGamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  roundScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";
}

function init() {
  isGamePlaying = true;

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  winningScore = document.getElementById("winningScore").value;

  document.querySelector(".dice-1").style.display = "none";
  document.querySelector(".dice-2").style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}
