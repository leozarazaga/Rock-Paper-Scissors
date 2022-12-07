let playerScore = 0;
let computerScore = 0;

const resultDisplay = document.getElementById("result");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const showIcon = document.querySelector(".showYou i");
const computerShowIcon = document.querySelector(".showComputer i");
const buttons = document.querySelectorAll(".selection button");

let winner;
let myArray = [];

function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let randomNumber = Math.floor(Math.random() * 3);
  myArray.push(choices[randomNumber]);
  return choices[randomNumber];
}

function win() {
  playerScore++;
  myArray.push("player");
  resultDisplay.innerHTML = "You win!";
  document.querySelector("#playerScore").innerHTML = playerScore;
  document.querySelector("#computerScore").innerHTML = computerScore;
  playerScoreCount();
}

function lose() {
  computerScore++;
  myArray.push("computer");
  resultDisplay.innerHTML = "You loose!";
  document.querySelector("#playerScore").innerHTML = playerScore;
  document.querySelector("#computerScore").innerHTML = computerScore;
  playerScoreCount();
}

function tie(userChoice, computerChoice) {
  myArray.push("Draw");
  resultDisplay.innerHTML = "Draw!!";
  document.querySelector("#playerScore").innerHTML = playerScore;
  document.querySelector("#computerScore").innerHTML = computerScore;
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  if (computerChoice === "rock") {
    computerShowIcon.className = "fas fa-hand-rock";
  } else if (computerChoice === "paper") {
    computerShowIcon.className = "fas fa-hand-paper";
  } else {
    computerShowIcon.className = "fas fa-hand-scissors";
  }

  switch (userChoice + computerChoice) {
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      win(userChoice, computerChoice);
      break;

    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      lose(userChoice, computerChoice);
      break;

    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      tie(userChoice, computerChoice);
      break;
  }
  localStorage.setItem("array", JSON.stringify(myArray));
}

function main() {
  /*   let numbeOfButtons = document.querySelectorAll(".button").length;

  for (let i = 0; i < numberOfButtons; i++){
    document.querySelectorAll(".button")[i].addEventListener("click", function(){
     let clickedBtn = event.target.className;
      showIcon.className = clickedBtn;
      game(event.target.id);
  }

   */

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let clickedBtn = event.target.className;
      showIcon.className = clickedBtn;
      myArray.push(event.target.id);
      game(event.target.id);
    });
  });
}

main();

function restartGame() {
  window.location.reload();
}

function playerScoreCount() {
  if (playerScore >= 3) {
    resultDisplay.innerHTML = "You are a champion!";
    let h = document.createElement("h1");
    h.textContent = "Go to Game History tab to see your game history. ";
    h.setAttribute("id", "h1");
    document.querySelector("body").appendChild(h);

    let audiowin = new Audio("applause.wav");
    audiowin.play();
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
  } else if (computerScore >= 3) {
    resultDisplay.innerHTML = "Computer beats you!";
    let h = document.createElement("h1");
    h.textContent = "Go to Game History tab to see your game history. ";
    h.setAttribute("id", "h1");
    document.querySelector("body").appendChild(h);

    let audiolose = new Audio("lose.wav");
    audiolose.play();
    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;
  }
}
