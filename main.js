// ################## Variables Declaration Start #################### 
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let delAll = document.querySelector(".del");
let tasksDiv = document.querySelector(".tasks");
let title = document.querySelector(".task-card h2");


 // Creating a date object
let today = new Date();  
let month = today.toLocaleString('default', { month: 'short' }); // Getting short month name (e.g. "Oct") 
let dd = today.getDate();  
let yy = today.getFullYear();
let DateStr =  dd + " " + month.toUpperCase() + ", " + yy;

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// ################## Variables Declaration End ####################

// Get ToDay Date and set it to card title  
window.onload = function(){
  input.focus();
  title.innerHTML = DateStr + " Daily Tasks"
}


// Get Enter button clickable behaviour  
input.addEventListener("keypress", (e) =>{
    if(e.key === "Enter"){
      e.preventDefault();
      submit.click();
    }
});

// Delete All tasks and reset variables 
delAll.onclick = function () {
  console.log("Hello del ...");
    // Empty Tasks Div
  tasksDiv.innerHTML = "";
  let data = window.localStorage.getItem("tasks");
  if (data) {
  console.log("Hello del ...",data);
  window.localStorage.removeItem("tasks");
  arrayOfTasks = [];
  console.log("Hello del ...",data);
  }

}

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("fa-trash")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("fa-check")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Toggle Done Class
    e.target.parentElement.classList.toggle("done");
  }

    if (e.target.classList.contains("fa-edit")) {
  
    console.log("Elm from first child ", e.target.parentElement.firstElementChild);
     e.target.parentElement.firstElementChild.disabled = false
     e.target.previousElementSibling.style.display = 'block';
  }

   if (e.target.classList.contains("fa-bookmark")) {
    editTaskInput(e.target.parentElement);
    e.preventDefault();
  }

});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    let field = document.createElement("input");
    field.value = task.title;
    field.disabled = true;
    div.appendChild(field);

    // Create Save Button
    let sav = document.createElement("i");
    sav.className = "fa fa-bookmark";
    sav.style.display = 'none';
    // Append Button To Main Div
    div.appendChild(sav);

     // Create Edit Button
    let edit = document.createElement("i");
    edit.className = "fa fa-edit";
    div.appendChild(edit);

    // Create Delete Button
    let span = document.createElement("i");
    span.className = "fa fa-trash";
    div.appendChild(span);

    // Create Done Button
    let done = document.createElement("i");
    done.className = "fa fa-check";
    div.appendChild(done);

  
  // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}


// Edit task text
function editTaskInput(taskElm){
 let taskId = taskElm.getAttribute("data-id");
   for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].title = taskElm.firstElementChild.value;
      taskElm.firstElementChild.disabled = true;
      taskElm.firstElementChild.nextElementSibling.style.display = 'none';
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
  
    // console.log("Elm is " ,taskElm.firstElementChild.value);
}