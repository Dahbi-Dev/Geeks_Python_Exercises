// Array to store tasks (BONUS I - array of task objects)
let tasks = [];
let taskIdCounter = 0;

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const listTasks = document.querySelector('.listTasks');
const clearBtn = document.getElementById('clearBtn');

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Check if input is not empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create task object (BONUS I)
    const newTask = {
        task_id: taskIdCounter,
        text: taskText,
        done: false
    };
    
    // Add task to array
    tasks.push(newTask);
    
    // Add task to DOM
    addTaskToDOM(newTask);
    
    // Clear input and increment counter
    taskInput.value = '';
    taskIdCounter++;
}

// Add task to DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.setAttribute('data-task-id', task.task_id);
    
    taskItem.innerHTML = `
        <button class="delete-btn" onclick="deleteTask(${task.task_id})">
            <i class="fas fa-times"></i>
        </button>
        <input type="checkbox" class="task-checkbox" onchange="doneTask(${task.task_id})" ${task.done ? 'checked' : ''}>
        <label class="task-label ${task.done ? 'done' : ''}">${task.text}</label>
    `;
    
    listTasks.appendChild(taskItem);
}

// BONUS I - Done task function
function doneTask(taskId) {
    // Find task in array and update done property
    const task = tasks.find(t => t.task_id === taskId);
    if (task) {
        task.done = !task.done;
        
        // Update DOM
        const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
        const taskLabel = taskItem.querySelector('.task-label');
        
        if (task.done) {
            taskLabel.classList.add('done');
            taskItem.classList.add('completed');
        } else {
            taskLabel.classList.remove('done');
            taskItem.classList.remove('completed');
        }
    }
}

// BONUS II - Delete task function
function deleteTask(taskId) {
    // Remove task from array
    tasks = tasks.filter(task => task.task_id !== taskId);
    
    // Remove task from DOM
    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskItem) {
        taskItem.remove();
    }
}

// Clear all tasks
function clearAllTasks() {
    tasks = [];
    listTasks.innerHTML = '';
    taskIdCounter = 0;
}

// Event listeners
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

clearBtn.addEventListener('click', clearAllTasks);

// Allow Enter key to add task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});