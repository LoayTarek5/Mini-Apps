// Array Of Words
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 5,
  Hard: 2,
};

// Start info //

// Level Of THE Game
let lvlGame = document.querySelector(".start-area .lvl");
// Time of Each Word
let timeWord = document.querySelector(".start-area .time-word");
// start Btn to Start THe Game
let startBtn = document.querySelector(".start-area button");

// Area That the random Word Appears
let randomWord = document.querySelector(".start-area .selected-word");

// Input Field
let inputTyped = document.querySelector(".typing-area input");

// Continer of The Words THat user should typed
let containerWords = document.querySelector(".words-container");

let timeCount = document.querySelector(".info-game .time span");
timeCount.innerText = lvls.Normal;
// Scores of User
let score = document.querySelectorAll(".info-game .score span");
// Add Words That IN Array in the Div to appent it in the words container
function addWords() {
  containerWords.innerText = "";
  for (let i = 0; i < words.length; i++) {
    let word = document.createElement("div");
    word.innerText = words[i];
    containerWords.appendChild(word);
  }
  selectWord();
}

// Select Random Word From Array then Delete It
function selectWord() {
  let random = Math.floor(Math.random() * words.length);
  randomWord.innerText = words[random];
  let wordsDivs = document.querySelectorAll(".words-container div");
  wordsDivs.forEach((div) => {
    if (div.innerText === words[random]) div.remove();
  });
  words.splice(random, 1);

  countDown();
}

// Set The Count Down on each Word depending on Game Level
function countDown() {
  timeCount.innerText = lvls.Normal;

  let countdownInterval = setInterval(() => {
    console.log(timeCount.innerText);
    timeCount.innerText--;
    if (document.querySelector(".info-game .time span").innerText === "0") {
      clearInterval(countdownInterval);
      if (
        inputTyped.value.toLowerCase() === randomWord.innerText.toLowerCase()
      ) {
        score[0].innerText++;
        inputTyped.value = "";
        if (words.length > 0) {
          selectWord();
        } else {
          // Win THe Game Or the Words length equal 0
          finishGame(true);
        }
      } else {
        // Lose
        finishGame(false);
      }
    }
  }, 1000);
}

function finishGame(status) {

  let div = document.createElement("div");
  div.classList.add("end-content");
  let finalMsg = document.createElement("p");
  finalMsg.classList.add("final-msg");
  let againBtn = document.createElement("button");
  againBtn.classList.add("again-btn");
  againBtn.innerText = "Play Again";

  if (status) {
    finalMsg.innerText = `Congratulation\n${0} WPM`;
  } else {
    finalMsg.innerText = `You Did Not type All Words\n${0} WPM`;
  }

  div.appendChild(finalMsg);
  div.appendChild(againBtn);
  document.querySelector(".container").remove();
  document.body.appendChild(div);
  againBtn.onclick = () => {
    location.reload();
  }
}



startBtn.onclick = function () {
  inputTyped.focus();
  addWords();
  this.remove();
};

