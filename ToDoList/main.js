// Toggle Menu
let menuBtn = document.querySelector(".toggle-menu .icon");
// Input Area
let inputTask = document.querySelector("header .input-task");
// Add Button
let addTaskBtn = document.querySelector("header .add-task");
// Container That contains All Tasks
let taskContanier = document.querySelector(".task-container");
// Button To Delete all Tasks
let delAll = document.querySelector(".task-menu .del-all");

// Array That containes Tasks
let arrTasks = [];
// Array That containes History Of Tasks
let historyTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Check  Input of User or if he click of add Button or press Enter
function checkInput() {
  // If User Click Add button then Add Task
  addTaskBtn.onclick = () => {
    if (inputTask.value !== "") {
      addTaskToArr(inputTask.value);
      addTaskToPage();
      inputTask.value = "";
      inputTask.focus();
    }
  };
  // If User Press Enter Add Task
  inputTask.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // Cancel the default action, if needed
      e.preventDefault();
      if (inputTask.value !== "") {
        addTaskBtn.click();
      }
    }
  });
}
// Check if The Task is Completed(Done)
function checkCompleted() {
  arrTasks.forEach((task) =>{
    if(task.completed) {

    }
  });
}

function addTaskToArr(taskContent) {
  const task = {
    id: Date.now(),
    completed: false,
    title: taskContent,
  };
  arrTasks.push(task);
  // Save Task's Array to Local Storage
  localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function addTaskToPage() {
  taskContanier.innerHTML = "";
  arrTasks.forEach((taskData) => {
    // Create Tasks That contain Data of Task
    let task = document.createElement("div");
    if(taskData.completed) {
      task.classList.add("task", "check");
    } else {
      task.classList.add("task");
    }
    task.setAttribute("data-id", taskData.id);

    // check Task
    let checkTask = document.createElement("span");
    checkTask.classList.add("check-task");
    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-check");
    checkTask.appendChild(checkIcon);

    let taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.innerText = taskData.title;

    let taskProp = document.createElement("div");
    taskProp.classList.add("task-prop");
    let editTask = document.createElement("i");
    editTask.classList.add("fa-solid", "fa-pencil");
    let delTask = document.createElement("i");
    delTask.classList.add("fa-solid", "fa-trash");
    taskProp.appendChild(editTask);
    taskProp.appendChild(delTask);

    task.appendChild(checkTask);
    task.appendChild(taskName);
    task.appendChild(taskProp);

    taskContanier.appendChild(task);
  });
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    arrTasks = JSON.parse(data);
    addTaskToPage();
  }
}

function delAllTasks() {
  localStorage.clear();
  arrTasks = [];
  // Delte from Tasks form page
  addTaskToPage();
}

// On click On Menu
menuBtn.onclick = () => {
  document.querySelector(".toggle-menu .task-menu").classList.toggle("appear");
};

// On click it will be Delete all Task from local Storage and from array of tasks
delAll.onclick = () => {
  delAllTasks();
};

// Delete The Selectd Task
function delSelectedTask(e) {
  arrTasks.forEach((task) => {
    if (task.id === +e.target.parentElement.parentElement.dataset.id) {
      arrTasks.splice(arrTasks.indexOf(task), 1);
      e.target.parentElement.parentElement.remove();
    }
  });
  // Update Data to  Local Storage
  localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

// Edit The Selectd Task
function editSelectedTask(element) {
  // When the USer click on edit then replace text with input field
  let textTask = element.children[1];
  let inputText = document.createElement("input");
  inputText.style.marginLeft = "35px";
  inputText.classList.add("input-text");
  inputText.setAttribute("type", "text");
  inputText.value = element.children[1].innerText;
  element.children[1].replaceWith(inputText);
  inputText.focus();
  // if User press enter or click any where out side the input field the text will saved
  inputText.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // Cancel the default action, if needed
      e.preventDefault();
      if (inputText.value !== "") {
        textTask.innerText = inputText.value;
        arrTasks.forEach((task) => {
          if (task.id === +element.dataset.id) {
            task.title = inputText.value;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(arrTasks));
        inputText.replaceWith(textTask);
      }
    }
  });
  inputText.addEventListener("blur", () => {
    if (inputText.value !== "") {
      textTask.innerText = inputText.value;
      arrTasks.forEach((task) => {
        if (task.id === +element.dataset.id) {
          task.title = inputText.value;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(arrTasks));
      inputText.replaceWith(textTask);
    }
  });
}

// Check(Done) The Task
function checkTask(element) {
  element.classList.toggle("check");
  // If the Task was Checked(Done) play sound and Set the "completed" to True in object 
  if(element.classList.contains("check")) {
    let mySound = new Audio('positive_response_81640.mp3')
    mySound.play();
    arrTasks.forEach((task) => {
      if (task.id === +element.dataset.id) {
        task.completed = true;
      }
    });
  } else {
    arrTasks.forEach((task) => {
      if (task.id === +element.dataset.id) {
        task.completed = false;
      }
    });
  }
  localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

taskContanier.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    delSelectedTask(e);
  }
  if (e.target.classList.contains("fa-pencil")) {
    editSelectedTask(e.target.parentElement.parentElement);
  }
  if(e.target.classList.contains("check-task") || e.target.classList.contains("fa-check")) {
    checkTask(e.target.parentElement.parentElement)
  }
  
});

checkInput();
