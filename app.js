const openTaskFormBtn = document.getElementById("open-button");
const taskForm = document.getElementById("taskForm")
const submitButton = document.getElementById("add-or-update-task-btn");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const tasksContainer = document.getElementById("tasks-container");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");


let taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

openTaskFormBtn.addEventListener("click", () => {
    console.log("i'm pressing open button");
    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
    openTaskFormBtn.classList.add("hidden");
})

const addOrUdpateTask = () => {
    /*
    1)This function will first check if there's any value inside
    the title input. if not it will alert.
    2) it then creates an object filled with the all the input values and then saves it into an object
    3) it will then insert the object into the array that contains
     all the objects. 
     4) Finally it inserts into localstorage and uses stringify to turn the entire object into a string
     
     TL/DR: it creates an object with all input values and inserts into main
     array and sends to local storage*/
    if (!titleInput.value.trim()) {
        alert("Please Provide A Title");
        return;
    }


    /*This part is very imporant. Essentially every time we click our submit button (for either submit or update)
    this function will check if our taskData has a certain id in currentTask which is initialized as empty. Because it's empty upon
    initialization it will return a -1, which allows us to unshift and to our taskData array. However,
    in our edit function, we call for the id of task being edited save it into the currenTask object.
    This way we will overwrite the exisiting values of that specific element in the array*/
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    //
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
    openTaskFormBtn.classList.toggle("hidden");
    reset();

}

taskForm.addEventListener("submit", function (event) {
    console.log("i'm pressing submit");
    addOrUdpateTask();
    event.preventDefault();



})

closeTaskFormBtn.addEventListener("click", ()=>{
    console.log("close button clicked");
    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
    openTaskFormBtn.classList.toggle("hidden");
})

const updateTaskContainer = () => {

    tasksContainer.innerHTML = "";

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
    submitButton.innerText = "Add Task"
}

if (taskData.length) {
    updateTaskContainer();
}

const deleteTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex((e) =>
        e.id === buttonEl.parentElement.id
    )
    buttonEl.parentElement.remove(); //removes the div hthml
    taskData.splice(dataArrIndex, 1); //removes the piece from the index
    localStorage.setItem("data", JSON.stringify(taskData));


};

const editTask = (buttonEl) => {
    tasksContainer.classList.toggle("hidden")
    taskForm.classList.toggle("hidden");
    submitButton.innerText = "Update?"

    currentTask.id = buttonEl.parentElement.id;


    const dataArrIndex = taskData.findIndex((e) =>
        e.id === buttonEl.parentElement.id
    );
    titleInput.value = taskData[dataArrIndex].title;
    dateInput.value = taskData[dataArrIndex].date;
    descriptionInput.value = taskData[dataArrIndex].description;
    openTaskFormBtn.classList.toggle("hidden")


}
