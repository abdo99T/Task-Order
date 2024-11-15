// تحميل المهام عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  
  if (taskText === "") {
    alert("يرجى كتابة مهمة جديدة");
    return;
  }
  
  // إضافة مهمة جديدة كغير مكتملة
  createTaskElement(taskText, false);
  saveTask(taskText, false);
  taskInput.value = "";
}

function createTaskElement(taskText, isCompleted) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");
  
  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;
  
  // مربع اختيار لحالة المهمة
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = isCompleted;
  checkBox.onchange = function() {
    toggleTaskCompletion(taskText, checkBox.checked);
    taskContent.style.textDecoration = checkBox.checked ? "line-through" : "none";
  };
  
  // زر حذف
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "حذف";
  deleteButton.onclick = function() {
    removeTask(taskText, taskItem);
  };
  
  taskItem.appendChild(checkBox);
  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteButton);
  document.getElementById("task-list").appendChild(taskItem);

  if (isCompleted) {
    taskContent.style.textDecoration = "line-through";
  }
}

function toggleTaskCompletion(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  tasks = tasks.map(task => {
    if (task.text === taskText) {
      return { text: task.text, completed: isCompleted };
    }
    return task;
  });
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText, taskItem) {
  taskItem.remove();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}