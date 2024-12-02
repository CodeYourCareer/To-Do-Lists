const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    taskInput.value = "";
  }
});
function addTask(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    li.remove();
  });
  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function saveTasksToLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text, task.completed);
  });
}

function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  if (completed) li.classList.add("completed");

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasksToLocalStorage();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTasksToLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
  saveTasksToLocalStorage();
}
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
