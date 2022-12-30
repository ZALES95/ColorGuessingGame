const currentColorInfo = document.querySelector(".nav__random-color")
const changeColors = document.querySelector(".nav__set-new-colors")
const resetBtn = document.querySelector(".nav__reset")
const easyLevel = document.querySelector(".nav__easy")
const hardLevel = document.querySelector(".nav__hard")
const levelChanger = document.querySelector(".nav__level-changer")
const correctNumber = document.querySelectorAll(".nav__correct-number")
const mistakeNumber = document.querySelector(".nav__mistakes-number")
const squaresBox = document.querySelector(".squares")
const allSquares = document.querySelectorAll(".square")
const redColor = document.querySelectorAll(".red")
const greenColor = document.querySelectorAll(".green")
const blueColor = document.querySelectorAll(".blue")
const resultDesc = document.querySelector(".score__desc")
const results = document.querySelector(".score")
const restartButton = document.querySelector(".restart-button")
const recordNumberInfo = document.querySelector(".score__record-number")

let correctColor
let correctNumberText = 0
let mistakeNumberText = 3
let recordNumber = 0
let counter = 0

const correctSound = new Audio("/img/476178__unadamlar__correct-choice.wav")
const incorrectSound = new Audio("/img/188013__isaac200000__error.wav")
const gameOverSound = new Audio("/img/607207__fupicat__congrats.wav")

function setHeight() {
	allSquares.forEach(square => {
		square.style.height = `${square.offsetWidth}px`
	})
}

const shuffleColor = () => {
	let colorsArray = []
	for (const square of allSquares) {
		const red = Math.floor(Math.random() * 255)
		const green = Math.floor(Math.random() * 255)
		const blue = Math.floor(Math.random() * 255)
		const currentColor = `rgb(${red}, ${green}, ${blue})`
		square.style.background = currentColor
		colorsArray.push(currentColor)
	}
	const index = Math.floor(Math.random() * colorsArray.length)
	correctColor = colorsArray[index]
	currentColorInfo.textContent = correctColor
}

const checkSquare = e => {
	if (
		e.target.style.background === correctColor &&
		e.target.matches(".square")
	) {
		correctNumberText++
		if (results.classList.contains("showResultClass")) {
			return
		} else {
			if (correctNumberText > recordNumber) {
				recordNumber = correctNumberText
				recordNumberInfo.textContent = recordNumber
			}
			correctNumber.forEach(num => {
				num.textContent = correctNumberText
			})
			correctSound.play()
		}
		descInfo()
		shuffleColor()
	} else if (
		e.target.style.background !== correctColor &&
		e.target.matches(".square")
	) {
		mistakeNumberText--
		if (results.classList.contains("showResultClass")) {
			return
		} else {
			incorrectSound.play()
			if (mistakeNumberText < 0) {
				showResults()
				gameOverSound.play()
			} else {
				mistakeNumber.textContent = mistakeNumberText
			}
		}
		shuffleColor()
	}
}

const resetNumbers = () => {
	correctNumberText = 0
	correctNumber.forEach(num => {
		num.textContent = 0
	})
	mistakeNumberText = 3
	mistakeNumber.textContent = mistakeNumberText
}

const showResults = () => {
	results.classList.add("showResultClass")
}

const descInfo = () => {
	if (correctNumberText <= 3) {
		resultDesc.textContent = "Musisz jeszcze poćwiczyć...  😿 "
	} else if (correctNumberText > 3 && correctNumberText <= 6) {
		resultDesc.textContent = "Tak trzymaj! 😼"
	} else {
		resultDesc.textContent = "Jesteś mistrzem! 🙀"
	}
}

const playAgain = () => {
	results.classList.remove("showResultClass")
	resetNumbers()
	changeColors.classList.remove("grayColor")
	counter = 0
}

const changeLevel = e => {
	if (e.target.matches(".nav__easy")) {
		if (e.target.classList.contains("background-level")) {
			return
		} else {
			easyLevel.classList.add("background-level")
			hardLevel.classList.remove("background-level")
			allSquares[4].remove()
			allSquares[5].remove()
			Object.defineProperty(allSquares, "length", {
				writable: true,
				value: allSquares.length - 2,
			})
			shuffleColor()
			playAgain()
		}
	} else if (e.target.matches(".nav__hard")) {
		if (e.target.classList.contains("background-level")) {
			return
		} else {
			hardLevel.classList.add("background-level")
			easyLevel.classList.remove("background-level")
			allSquares[4] = document.createElement("div")
			allSquares[4].classList.add("square")
			allSquares[5] = document.createElement("div")
			allSquares[5].classList.add("square")
			squaresBox.append(allSquares[4], allSquares[5])
			Object.defineProperty(allSquares, "length", {
				writable: true,
				value: allSquares.length + 2,
			})
			shuffleColor()
			playAgain()
		}
	}
}

window.addEventListener("resize", setHeight)
squaresBox.addEventListener("click", checkSquare)
restartButton.addEventListener("click", playAgain)
changeColors.addEventListener("click", () => {
	if (counter < 5) {
		shuffleColor()
		counter++
	} else {
		changeColors.classList.add("grayColor")
	}
})
resetBtn.addEventListener("click", () => {
	playAgain()
	shuffleColor()
})
levelChanger.addEventListener("click", changeLevel)

setHeight()
shuffleColor()
descInfo()
