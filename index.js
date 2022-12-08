// <!-- BINGO CHALLENGE!
// Create programmatically (using JS) a bingo board with 76 cells, numbered from 1 to 76.

// Create a button to randomize a number from 1 to 76.

// The cell with same number should be highlighted in some way on the bingo board.

// EXTRA:

// – Make sure to always select a new number (eg. avoid getting the number 10 multiple times).

// – Create a user board with 24 randomized numbers that highlights as the main board does.

// – Let the user choose how many user boards he’s willing to play with and generate them before starting to play.

// Commit and push the code to your personal GitHub repository; post the link of your commit below before 17.00 CET. -->

let containerNode = document.getElementsByClassName("container")[0]
let mainBingoNode = document.querySelector(".main-bingo-container")
let userBoardContainer = document.querySelector(".user-board")
let numberInputNode = document.getElementById("quantity")

let randomArr = []
let bingoNumbers = []
let userBoardArr = []

const createMainBingo = () => {
  for (let i = 1; i <= 76; i++) {
    bingoNumbers.push(i)

    let cardNode = document.createElement("div")

    cardNode.classList.add("bingo-card")
    cardNode.innerText = i

    mainBingoNode.appendChild(cardNode)
  }
  console.log(bingoNumbers)
  return mainBingoNode
}

let colorRandomer = () => {
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  let randomColor = `rgb(${r}, ${g}, ${b})`
  return randomColor
}

const randomBingo = () => {
  // bingNumbers initially contains 1->76
  if (bingoNumbers.length > 0) {
    // pick a random index
    let randomIndex = Math.floor(Math.random() * bingoNumbers.length)
    // get the number stored in that index
    let randomNumber = bingoNumbers[randomIndex]
    // delete the number from the array
    bingoNumbers.splice(randomIndex, 1)
    let randomColor = colorRandomer()
    let cards = document.querySelectorAll(".bingo-card")

    let sameCard = cards[randomNumber - 1]
    sameCard.style.background = randomColor
    //display user board same number
    let userCards = document.querySelectorAll(".user-board .bingo-card")
    for (const userCard of userCards) {
      if (userCard.innerText == randomNumber) {
        userCard.style.background = randomColor
      }
    }
  } else {
    alert("game over")
  }
}

const userBoard = () => {
  let userBingoBoard = []
  userBingoBoard.innerHtml = ""

  for (let i = 1; i <= 76; i++) {
    userBingoBoard.push(i)
  }
  let randomColor = colorRandomer()
  for (let i = 0; i < 24; i++) {
    let randomIndex = Math.floor(Math.random() * userBingoBoard.length)
    let randomNumber = userBingoBoard[randomIndex]

    userBingoBoard.splice(randomIndex, 1)
    let cardNode = document.createElement("div")

    cardNode.classList.add("bingo-card")
    cardNode.style.borderColor = randomColor
    cardNode.innerText = randomNumber

    userBoardContainer.appendChild(cardNode)
  }

  console.log(userBoardArr)
}

const numberOfBoards = () => {
  let number = numberInputNode.value

  console.log(number)
  userBoardContainer.innerHTML = ""
  for (let i = 0; i < number; i++) {
    let userTitle = document.createElement("div")
    userTitle.innerText = `Board number ${i + 1}`
    userBoardContainer.appendChild(userTitle)

    userBoard()
  }
}
window.onload = () => {
  createMainBingo()

  numberInputNode.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      numberOfBoards()
    }
  })
}
