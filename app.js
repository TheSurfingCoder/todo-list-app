const openTaskFormBtn = document.getElementById("open-button");
const taskForm = document.getElementById("taskForm")
const submitButton = document.getElementById("submitButton");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const tasksContainer = document.getElementById("tasks-container");


let taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

openTaskFormBtn.addEventListener("click", () => {
    console.log("i'm pressing open button");
    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
})

const addOrUdpateTask = () => {
    if (!titleInput.value.trim()) {
        alert("Please Provide A Title");
        return;
    }

    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
    };

    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();

}

taskForm.addEventListener("submit", function (event) {
    console.log("i'm pressing submit");
    addOrUdpateTask();
    event.preventDefault();


})

const updateTaskContainer = () => {

    taskData.forEach(({ id, title, date, description }) => {
        console.log(`We have ${taskData.length} amount of tasks`)
        tasksContainer.innerHTML += `
    <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
    `
    });
    tasksContainer.classList.toggle("hidden");

}


const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
}

if (taskData.length) {
    updateTaskContainer();
}