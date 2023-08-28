// Category Of Test
let category = document.querySelector("header .category span");

// Number of Questions
let numQuestions = document.querySelector("header .question-count span");

// The Head of Question-content
let headerQuesiton = document.querySelector(".question-content h2");

// Choices of The Question labels
let choicesLabels = document.querySelectorAll(
  ".question-content form .answer label"
);

// Choices of The Question input radio
let choicesInput = document.querySelectorAll(
  ".question-content form .answer input"
);

// bullets Questions
let bullets = document.querySelectorAll(".question-info .bullets li");
// Next Button
let nextBtn = document.querySelector(".question-content .submit-btn");

// Current Question
let currQuestion = 0;
// Limtits of QUestions
let limitQuestions;
//Right Answer
let corretAns;
// Score
let score = 0;

// Extract Data of Quesitons from JSON File
function getQuestionsData() {
  fetch("html_questions.json")
    .then((response) => response.json())
    .then((data) => {
      // Get the Data from the file
      let dataQuestions = data;
      limitQuestions = dataQuestions.length;
      // Store The Correct Answer
      corretAns = dataQuestions[currQuestion].right_answer;
      setData(dataQuestions);

      //
    });
}

// Set Data to Question Content on Every Questions
function setData(arrData) {
  headerQuesiton.innerText = arrData[currQuestion].title;
  // Set Choices
  choicesLabels.forEach((label, index) => {
    label.innerText = arrData[currQuestion][`answer_${index + 1}`];
  });
  // Set Data Choices
  choicesInput.forEach((input, index) => {
    input.dataset.answer = arrData[currQuestion][`answer_${index + 1}`];
  });

  bullets[currQuestion].classList.add("active");
}

// To Remove the Checked Radio Input Every Next Question
function removeCheckedRadio() {
  choicesInput.forEach((input) => {
    input.checked = false;
  });
}


// To Check If the Choosen was the Correct or Not
function checkAnswer() {
  choicesInput.forEach((input) => {
    if (input.checked) {
      if (input.dataset.answer === corretAns) score++;
    }
  });
}

// To Add Active Class Next Question
function activeBullets() {
  bullets.forEach((li) => {
    li.classList.remove("active");
  });
  bullets[currQuestion].classList.add("active");
}

function countdown(duration) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      document.querySelector(".counter span").innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        finishTest();
      }
    }, 1000);
  
}


function finishTest() {
  // pop up Message contains student's Rssult
  let endMsg = document.createElement("div");
  endMsg.innerText = `Final Result is ${score} / ${limitQuestions}`;
  endMsg.classList.add("end-msg");
  
  document.querySelector(".container").remove();
  document.body.appendChild(endMsg);
}


nextBtn.addEventListener("click", (e) => {
  currQuestion++;
  /*
  if(currQuestion == limitQuestions -1)
  {
    e.target.innerText = "Submit Test";
    e.target.style.backgroundColor = "green";
  }
  */
  if (currQuestion === limitQuestions) {
    finishTest();
    score = 0;
    currQuestion = 0;
  }
  checkAnswer();
  activeBullets();
  removeCheckedRadio();
  getQuestionsData();
});

getQuestionsData();
countdown(60*3);
