const headsData = {
  src: 'assets/images/penny-heads.jpg',
  message: 'You flipped heads!',
}

const tailsData = {
  src: 'assets/images/penny-tails.jpg',
  message: 'You flipped tails!',
}

const defaultMessage = "Let's get rolling!"
const defaultSrc = headsData.src
const defaultPercentage = '0%'

let totalCount = 0
let headsCount = 0
let tailsCount = 0

const makeTie = elementsArray => elementsArray.forEach(element => (element.classList = 'tie'))
const makeWin = element => (element.classList = 'winning')
const makeLose = element => (element.classList = 'losing')

document.addEventListener('DOMContentLoaded', () => {
  // ================================== DOM ELEMENTS  ================================== //
  let flipBtn = document.getElementById('flip')
  let clearBtn = document.getElementById('clear')
  let headsCountData = document.getElementById('heads')
  let headsPercentData = document.getElementById('heads-percent')
  let tailsCountData = document.getElementById('tails')
  let tailsPercentData = document.getElementById('tails-percent')
  let pennyImg = document.getElementById('penny-image')
  let message = document.getElementById('message')

  // ==================================  EVENTS  ================================== //
  const events = new EventEmitter()

  events.subscribe('FLIP', isHeads => {
    totalCount++
    if (isHeads) {
      headsCount++
      headsCountData.textContent = headsCount
    } else {
      tailsCount++
      tailsCountData.textContent = tailsCount
    }
    pennyImg.src = isHeads ? headsData.src : tailsData.src
    message.textContent = isHeads ? headsData.message : tailsData.message
  })

  events.subscribe('CALCULATE_PERCENTAGES', () => {
    const headsPercentage = Math.round((headsCount / totalCount) * 100)
    const tailsPercentage = Math.round((tailsCount / totalCount) * 100)
    headsPercentData.textContent = `${headsPercentage}%`
    tailsPercentData.textContent = `${tailsPercentage}%`
    const isTie = headsPercentage === tailsPercentage
    const isHeadsWinning = headsPercentage > tailsPercentage
    if (isTie) makeTie([headsPercentData, tailsPercentData])
    else if (isHeadsWinning) {
      makeWin(headsPercentData)
      makeLose(tailsPercentData)
    } else {
      makeWin(tailsPercentData)
      makeLose(headsPercentData)
    }
  })

  events.subscribe('RESET', () => {
    ;(totalCount = 0), (headsCount = 0), (tailsCount = 0)
    pennyImg.src = defaultSrc
    message.textContent = defaultMessage
    headsCountData.textContent = 0
    tailsCountData.textContent = 0
    headsPercentData.textContent = 0
    tailsPercentData.textContent = defaultPercentage
    makeTie([headsPercentData, tailsPercentData])
  })

  // ==================================  FLIP CLICK  ================================== //
  flipBtn.addEventListener('click', () => {
    events.emit('FLIP', Math.random() < 0.5)
    events.emit('CALCULATE_PERCENTAGES')
  })

  // ==================================  CLEAR CLICK  ================================== //
  clearBtn.addEventListener('click', () => events.emit('RESET'))
})
