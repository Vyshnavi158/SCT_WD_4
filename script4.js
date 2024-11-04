// script4.js

// Task List Array
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskListElement = document.getElementById('task-list');
const taskDatetime = document.getElementById('task-datetime');

// Render the Task List
function renderTasks() {
    taskListElement.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.name} <br> <small>${task.date}</small></span>
            <div class="task-actions">
                <button class="complete" onclick="toggleComplete(${index})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskListElement.appendChild(li);
    });
}

// Add Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskName = taskInput.value.trim();
    const taskDateTime = taskDatetime.value;

    if (taskName === '') return;

    const newTask = {
        name: taskName,
        date: taskDateTime,
        completed: false
    };

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTasks();
    
    taskInput.value = '';
    taskDatetime.value = '';
});

// Toggle Task Completion
function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTasks();
}

// Edit Task
function editTask(index) {
    const task = taskList[index];
    taskInput.value = task.name;
    taskDatetime.value = task.date;
    
    // Remove the task temporarily and update it when resubmitting
    taskList.splice(index, 1);
}

// Delete Task
function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTasks();
}

// Initialize the app
renderTasks();
