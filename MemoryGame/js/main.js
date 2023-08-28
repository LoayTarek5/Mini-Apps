// Start Of Game
function startGame() {
  // get Input  to Get user's Name
  let inputName = document.querySelector(".start-content input");

  // IF the user Does Not Enter His Name Create This Span to Warning him
  let emptyName = document.createElement("span");
  emptyName.innerText = "Invalid Name";

  // Click on Start Button
  document.querySelector(".start-content button").onclick = () => {
    if (inputName.value === "" || !/[a-z]/gi.test(inputName.value)) {
      document.querySelector(".start-content").appendChild(emptyName);
    } else {
      document.querySelector("header .name span").innerText = inputName.value;
      document.querySelector(".overlay").remove();
      document.querySelector(".start-content").remove();
    }
  };
}

// Wrong Attempts
let wrongAtt = 0;

// To Check if Win 
let correctAtt = 0;

// Selected Card limits
let selectedLimits = 2;

// Cards Container
let cardContaienr = document.querySelector(".card-content");

// Each Card in the Card's Content
let cards = document.querySelectorAll(".card-content .block");

// Array to Store The Flipped Cards To Check if The  Same
let cardsFlipped = [];

// Random The Cards
function randomCards() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * cards.length);
    card.style.order = random;
  });
}

// Flip the Card on Each Click
function flipCards() {
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Check the Limits of Slection
      if (selectedLimits > 0) {
        cardsFlipped.push(e.target.parentElement);
        e.target.parentElement.classList.add("is-filped");
        selectedLimits--;
      }
      if(selectedLimits === 0) {
        checkMatch();
      }
    });
  });
}

// Check if Flipped Cards are the Same Or Not
function checkMatch() {

  // if the Player Selected Two Cards , so check if the same or not
  if (cardsFlipped[0].dataset.brand === cardsFlipped[1].dataset.brand) {
    cardsFlipped[0].classList.add("is-filped");
    cardsFlipped[1].classList.add("is-filped");
    cardsFlipped = [];
    correctAtt++;
    // cardContaienr.classList.remove("on-click");
  } else {
    // Records The Wrond attempts of User
    document.querySelector("header .try span").innerText = ++wrongAtt;
    cardContaienr.classList.add("on-click");
    setTimeout(unflip, 1000);
  }
  selectedLimits = 2;
}

function unflip() {
  cardsFlipped.forEach((e) => e.classList.remove("is-filped"));
  cardContaienr.classList.remove("on-click");
  cardsFlipped = [];
}


// Check IF The User was Won
function isWin() { 
  if (correctAtt === (cards.length/2))
  {
    popWin();
  }
} 

function popWin(){
  // overlay on End game
  let overlay = document.createElement("div");
  overlay.classList.add("overlay");

  // Container to hold the info of the player & Start Button
  let againCont = document.createElement("div");
  againCont.classList.add("again-content");

  // Text of Winging
  let wonMsg = document.createElement("p");
  wonMsg.appendChild(document.createTextNode("You Won!"));

  // Create Button To PLay Again
  let againBtn = document.createElement("button");
  againBtn.appendChild(document.createTextNode("Play Again"));
  againBtn.classList.add("again-btn");

  againCont.appendChild(wonMsg);
  againCont.appendChild(againBtn);
  document.body.appendChild(overlay);
  document.body.appendChild(againCont);

  againBtn.onclick = () => {
    location.reload();
  }
}


startGame();
randomCards();
flipCards();
isWin();