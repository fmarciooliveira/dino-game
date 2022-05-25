const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (isJumping == false) {
      jumpDino()
    }
  }
}

function jumpDino() {
  isJumping = true

  let upInterval = setInterval(() => {
    if (position >= 200) {
      clearInterval(upInterval)
      let downInterval = setInterval(() => {
        position -= 10
        dino.style.bottom = position.toString() + 'px'
        if (position <= 0) {
          clearInterval(downInterval)
        }
      }, 20)

      isJumping = false
    } else {
      position += 10
      dino.style.bottom = position.toString() + 'px'
      isJumping = false
    }
  }, 20)
}

function createCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1000

  let randomTime = Math.random() * 4000

  cactus.classList.add('cactus')
  cactus.style.left = '1000px'

  background.appendChild(cactus)

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus)
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //Game Over
      clearInterval(leftInterval)
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
    } else {
      cactusPosition -= 10
      cactus.style.left = cactusPosition + 'px'
    }
  }, 30)

  setTimeout(createCactus, randomTime)
}

document.addEventListener('keyup', handleKeyUp)
createCactus()
