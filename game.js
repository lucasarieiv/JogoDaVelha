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

function messageGame(message) {
  modalSpan.textContent = message 
}

function winGame() {
  messageGame("🎉 Ganhador")
  endGame()
}

function endGame() {
  modalOverlay.classList.add('-active')
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

function checkPlay() {

  let countX = 0
  let countO = 0

  for (const value of sequenceWin) {

    for (const position of value) {
      if (game[position] == "X") {
        countX++
      } else if (game[position] == "O"){
        countO++
      }

      if (countX == 3 || countO == 3) {
        winGame()
      } else {
        gameOver()
      }
    }

    countX = 0
    countO = 0
  }

}

function playerChange() {
  clickChange = !clickChange
  
  if(clickChange !== false) {
    // console.log('Jogador 1')
  } else {
    // console.log('Jogador 2')
  }
}

gameButtons.forEach(button => {
  button.addEventListener('click', ()=> {
    const playPosition = button.classList[0]

    if (!game[playPosition]) {
      playerChange()
      if (clickChange !== false) {
        game[button.classList[0]] = "O"
        button.classList.add('o')
        button.insertAdjacentText('afterbegin', "O")
      } else {
        game[button.classList[0]] = "X"
        button.insertAdjacentText('afterbegin', "X")
        button.classList.add('x')
      }
    }

    checkPlay()
     
  }, false)
});