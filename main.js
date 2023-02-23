let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");


window.onload = function(){
  input.focus();
}

input.addEventListener("keypress", (e) =>{
    if(e.key === "Enter"){
      e.preventDefault();
      submit.click();
    }
});

// Empty Array To Store The Tasks
let arrayOfTasks = [];

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
    // Toggle Completed For The Task
    // toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Toggle Done Class
    // e.target.parentElement.classList.toggle("done");
    // console.log("Elm from contain ", e.target.previousElementSibling);
    console.log("Elm from first child ", e.target.parentElement.firstElementChild);
    //console.log("Elm from first child text ", e.target.parentElement.firstElementChild.value);
     e.target.parentElement.firstElementChild.disabled = false
     e.target.previousElementSibling.style.display = 'block';
    //editTaskInput(e.target.parentElement);
  }

   if (e.target.classList.contains("fa-bookmark")) {
    // Toggle Completed For The Task
    // toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.add("saved");
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
    // done.className = "done";
    sav.className = "fa fa-bookmark";
    sav.style.display = 'none';
    // done.appendChild(document.createTextNode("Done"));
    // Append Button To Main Div
    div.appendChild(sav);


     // Create Edit Button
    let edit = document.createElement("i");
    edit.className = "fa fa-edit";
    // edit.appendChild(document.createTextNode("Edit"));
    // Append Button To Main Div
    div.appendChild(edit);


    // Create Delete Button
    let span = document.createElement("i");
    span.className = "fa fa-trash";
    // span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);

    // Create Done Button
    let done = document.createElement("i");
    // done.className = "done";
    done.className = "fa fa-check";
    // done.appendChild(document.createTextNode("Done"));
    // Append Button To Main Div
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
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
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
  
    console.log("Elm is " ,taskElm.firstElementChild.value);
}