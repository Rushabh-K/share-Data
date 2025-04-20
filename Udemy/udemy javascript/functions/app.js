const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const DEFAULT_USER_CHOICE = "ROCK";
const RESULT_DRAW = "ITS DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let isGameRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(
    `select ${ROCK} , ${PAPER} or ${PAPER}`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSOR) {
    alert(`User has choiced incorrect choice deafult choice selected ${ROCK}`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSOR;
  }
};

const getWinner = function (cChoice, pChoice) {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSOR) ||
    (cChoice === SCISSOR && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

startGameBtn.addEventListener("click", function () {
  if (isGameRunning) {
    return;
  }
  isGameRunning = true;
  console.log("game Started");
  const playerSelection = getPlayerChoice();
  const computerChoice = getComputerChoice();
  //   console.log("player Choice", playerSelection);
  //   console.log("Computer Choice", computerChoice);
  const winner = getWinner(computerChoice, playerSelection);
  //   console.log(winner);
  let message = ` you choiced ${playerSelection} and computer choiced ${computerChoice} `;
  if (winner === RESULT_PLAYER_WINS) {
    message = message + "Player Wins!";
  } else if (winner == RESULT_COMPUTER_WINS) {
    message = message + "Computer Wins!";
  } else {
    message = message + "Its Draw!";
  }
  alert(message);
  isGameRunning = false;
});
