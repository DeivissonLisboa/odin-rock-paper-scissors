const SCORE_DISPLAY = document.getElementById("score")
const STATUS = document.getElementById("status")
const PLAYER_DISPLAY = document.getElementById("player")
const COMPUTER_DISPLAY = document.getElementById("computer")
const ARENA = document.getElementById("arena")
const SELECTION_BTNS = document.querySelectorAll(".selection")
const PLAY_BTN = document.getElementById("play")

const SELECTION = ["rock", "paper", "scissors"]
let playerSelection = ""
let games = 0
let score = 0
let newGame = false

function getComputerSelection() {
  return SELECTION[Math.floor(Math.random() * SELECTION.length)]
}

function setArenaStatus(status) {
  ARENA.dataset.status = status
}

function resetArenaStatus() {
  ARENA.dataset.status = ""
}

function setScore() {
  score++
  SCORE_DISPLAY.textContent = score
}

function resetScore() {
  games = 0
  score = 0
  SCORE_DISPLAY.textContent = "0"
}

function setStatus(status) {
  STATUS.textContent = status
}

function resetStatus() {
  STATUS.textContent = `you need to win ${3 - score} more game(s)`
}

function play(playerSelection, computerSelection) {
  let win = false

  if (playerSelection === "rock" && computerSelection === "scissors") {
    win = true
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    win = true
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    win = true
  } else if (playerSelection === computerSelection) {
    setArenaStatus("tie")
    setStatus("It's a tie")
    return
  }

  if (win) {
    setScore()
    setStatus(`You Won! ${playerSelection} beats ${computerSelection}`)
    setArenaStatus("win")
  } else if (computerSelection === "dragon") {
    setStatus("You Lose! Dragon beats everything!")
    setArenaStatus("lose")
  } else {
    setStatus(`You Lose! ${computerSelection} beats ${playerSelection}`)
    setArenaStatus("lose")
  }

  games++
}

function setPlayerSelection(selection) {
  playerSelection = selection
  PLAYER_DISPLAY.dataset.selection = selection
}

function resetPlayerSelection() {
  playerSelection = ""
  PLAYER_DISPLAY.dataset.selection = ""
}

function setComputerSelection(selection) {
  COMPUTER_DISPLAY.dataset.selection = selection
}

function resetComputerSelection() {
  COMPUTER_DISPLAY.dataset.selection = ""
}

function game() {
  if (playerSelection) {
    let computerSelection
    if (games === 4 && score === 2) {
      computerSelection = "dragon"
    } else {
      computerSelection = getComputerSelection()
    }

    play(playerSelection, computerSelection)

    setComputerSelection(computerSelection)

    if (score >= 3) {
      PLAY_BTN.textContent = "victory"
      newGame = true
    } else if (games - score >= 3) {
      PLAY_BTN.textContent = "game over"
      newGame = true
    }

    PLAY_BTN.setAttribute("disabled", "")
  }
}

SELECTION_BTNS.forEach((selection) => {
  selection.addEventListener("click", () => {
    if (newGame) {
      newGame = false
      resetScore()
      PLAY_BTN.textContent = "play"
    }

    resetArenaStatus()
    resetComputerSelection()
    resetStatus()

    setPlayerSelection(selection.getAttribute("id"))

    PLAY_BTN.removeAttribute("disabled")
  })
})

PLAY_BTN.addEventListener("click", () => {
  game()
})
