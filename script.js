const addBtn = document.getElementById('add-btn');
const input = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load saved tasks
window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    taskList.innerHTML = saved;
    addEventListeners();
  }
};

// Add new task
addBtn.onclick = () => {
  if (input.value.trim() === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${input.value}</span>
    <button class="delete-btn">X</button>
  `;

  taskList.appendChild(li);
  input.value = '';
  saveTasks();
  addListenersTo(li);
};

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', taskList.innerHTML);
}

// Add events to new tasks
function addListenersTo(li) {
  li.querySelector('span').onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };
  li.querySelector('.delete-btn').onclick = () => {
    li.remove();
    saveTasks();
  };
}

// Add events to existing tasks (from storage)
function addEventListeners() {
  document.querySelectorAll('li').forEach(li => addListenersTo(li));
}
