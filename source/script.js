const CHOICES = ["rock", "paper", "scissors"]
let score = 0

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)]
}

function play() {
  let playerSelection = prompt("Rock, Paper or Scissors?").toLowerCase()
  let computerSelection = getComputerChoice()
  let win = false

  if (playerSelection === "rock" && computerSelection === "scissors") {
    win = true
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    win = true
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    win = true
  } else if (playerSelection === computerSelection) {
    console.log("DRAW! play again")
    play()
  }

  if (win) {
    score++
    return `You Won! ${playerSelection} beats ${computerSelection}`
  } else {
    return `You Lose! ${computerSelection} beats ${playerSelection}`
  }
}

function game() {
  score = 0
  for (let i = 0; i < 5; i++) {
    console.log(play())
  }
  console.log(`Score: ${score}`)
}

// game()
