let game = ["", "", "",
            "", "", "",
            "", "", ""]

let sequenceWin = [
  [0, 1, 2], [3,4,5], [6,7,8],
  [0, 4, 8], [2,4,6], [0,3,6],
  [1,4,7], [2,5,8]
]

const modalOverlay = document.querySelector('.modalOverlay')
const modalSpan = modalOverlay.querySelector('span')
const buttonRestart = modalOverlay.querySelector('.restart')
const gameButtons = document.querySelectorAll('div > button')
let clickChange = false

buttonRestart.addEventListener('click', ()=> {
  modalOverlay.classList.remove('-active')
  restartGame()
})

function messageGame(message, player) {
  modalSpan.classList.add(`player-${player}`)
  modalSpan.textContent = message
}

function addPoint(playerNumber) {
  let point = 0

  const scorePlayer1 = document.querySelector('.score-player-1')
  const scorePlayer2 = document.querySelector('.score-player-2')
  
  if (playerNumber == 1) {
    point = Number(localStorage.player1) + 1
    localStorage.player1 = point
    scorePlayer1.textContent = point
  } else {
    point = Number(localStorage.player2) + 1
    localStorage.player2 = point
    scorePlayer2.textContent = point

  }
}

function winGame(player) {

  messageGame(`🎉 Venceu `, player)
  addPoint(player)
  endGame()
}

function endGame() {
  modalOverlay.classList.add('-active')
  modalSpan.classList.remove('player1', 'player2')
}

function restartGame() {

  gameButtons.forEach(button => {
    button.innerHTML = ""
  })

  gameButtons.forEach(button => {
    button.classList.remove('o', 'x')

  })

  game = ["", "", "",
            "", "", "",
            "", "", ""]
}

function gameOver() {

  function isEmpty(value) {
    if (value !== "") {
      return value
    }
  }

  filtered = game.filter(isEmpty)

  if (filtered.length === 9) {
    messageGame('🎮 GameOver') 
    endGame()
  }
}
 
function checkPlay(player)  {
  
  let countX = 0
  let countO = 0
  
  for (const value of sequenceWin) {
  
    for (const position of value) {
      if (game[position] == "X") {
        ++countX
      } else if (game[position] == "O"){
        ++countO
      }
      
      if (countX == 3 || countO == 3) {
        winGame(player)
        return true
      } else {
        gameOver()
      }
    }

    countX = 0
    countO = 0
  }

}

function handlePlay(player) {
  checkPlay(player)
}


gameButtons.forEach(button => {
  button.addEventListener('click', ()=> {
    const playPosition = button.classList[0]
    clickChange = !clickChange

    let playerToggle = ''

    if (!game[playPosition]) {
      if (clickChange !== false) {
        playerToggle = '2'
        game[button.classList[0]] = "O"
        button.classList.add('o')
        button.insertAdjacentText('afterbegin', "O")
      } else {
        playerToggle = '1'
        game[button.classList[0]] = "X"
        button.insertAdjacentText('afterbegin', "X")
        button.classList.add('x')
      }
    }

    handlePlay(playerToggle)
     
  }, false)
});

function gameScore() {
  localStorage.setItem('player1', 0);
  localStorage.setItem('player2', 0);
}

gameScore()