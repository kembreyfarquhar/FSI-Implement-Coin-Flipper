const HEADS = {
  src: 'assets/images/penny-heads.jpg',
  message: 'You flipped heads!',
}

const TAILS = {
  src: 'assets/images/penny-tails.jpg',
  message: 'You flipped tails!',
}

const DEF_MSG = "Let's get rolling!"
const DEF_SRC = HEADS.src
const DEF_PERC = '0%'

let totalCt = 0,
  headsCt = 0,
  tailsCt = 0

const makeTie = elemArr => elemArr.forEach(elem => (elem.classList = 'tie'))
const makeWin = elem => (elem.classList = 'winning')
const makeLose = elem => (elem.classList = 'losing')

document.addEventListener('DOMContentLoaded', () => {
  // ================================== DOM ELEMENTS  ================================== //
  let flipBtn = document.getElementById('flip')
  let clearBtn = document.getElementById('clear')
  let headsCtData = document.getElementById('heads')
  let headsPercData = document.getElementById('heads-percent')
  let tailsCtData = document.getElementById('tails')
  let tailsPercData = document.getElementById('tails-percent')
  let pennyImg = document.getElementById('penny-image')
  let message = document.getElementById('message')

  // ==================================  EVENTS  ================================== //
  const events = new EventEmitter()

  events.subscribe('FLIP', isHeads => {
    totalCt++
    if (isHeads) headsCt++, (headsCtData.textContent = headsCt)
    else tailsCt++, (tailsCtData.textContent = tailsCt)
    pennyImg.src = isHeads ? HEADS.src : TAILS.src
    message.textContent = isHeads ? HEADS.message : TAILS.message
  })

  events.subscribe('CALCULATE_PERCENTAGES', () => {
    const headsPerc = Math.round((headsCt / totalCt) * 100)
    const tailsPerc = Math.round((tailsCt / totalCt) * 100)
    headsPercData.textContent = `${headsPerc}%`
    tailsPercData.textContent = `${tailsPerc}%`
    const isTie = headsPerc === tailsPerc
    const headsWin = headsPerc > tailsPerc
    if (isTie) makeTie([headsPercData, tailsPercData])
    else if (headsWin) {
      makeWin(headsPercData)
      makeLose(tailsPercData)
    } else {
      makeWin(tailsPercData)
      makeLose(headsPercData)
    }
  })

  events.subscribe('RESET', () => {
    ;(totalCt = 0), (headsCt = 0), (tailsCt = 0)
    ;(pennyImg.src = DEF_SRC), (message.textContent = DEF_MSG)
    ;(headsCtData.textContent = 0), (tailsCtData.textContent = 0)
    ;(headsPercData.textContent = DEF_PERC), (tailsPercData.textContent = DEF_PERC)
    makeTie([headsPercData, tailsPercData])
  })

  // ==================================  FLIP CLICK  ================================== //
  flipBtn.addEventListener('click', () => {
    events.emit('FLIP', Math.random() < 0.5)
    events.emit('CALCULATE_PERCENTAGES')
  })

  // ==================================  CLEAR CLICK  ================================== //
  clearBtn.addEventListener('click', () => events.emit('RESET'))
})
