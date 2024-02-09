const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const allButton = document.getElementById('all-button');
const completedButton = document.getElementById('completed-button');
const pendingButton = document.getElementById('pending-button');

let filter = 'all';

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const task = input.value.trim();
  if (task !== '') {
    addTodoItem(task);
    input.value = '';
  }
});

allButton.addEventListener('click', function() {
  filter = 'all';
  allButton.classList.add('active');
  completedButton.classList.remove('active');
  pendingButton.classList.remove('active');
  updateFilter();
});

completedButton.addEventListener('click', function() {
  filter = 'completed';
  completedButton.classList.add('active');
  allButton.classList.remove('active');
  pendingButton.classList.remove('active');
  updateFilter();
});

pendingButton.addEventListener('click', function() {
  filter = 'pending';
  pendingButton.classList.add('active');
  allButton.classList.remove('active');
  completedButton.classList.remove('active');
  updateFilter();
});

function addTodoItem(task) {
  const listItem = document.createElement('li');
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  
  const span = document.createElement('span');
  span.textContent = task;
  
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa-solid fa-trash';
  deleteButton.appendChild(deleteIcon);
  deleteButton.className = 'delete-button';
  
  const editButton = document.createElement('button');
  const editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pen';
  editButton.appendChild(editIcon);
  editButton.className = 'edit-button';
  
  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  todoList.appendChild(listItem);
  
  deleteButton.addEventListener('click', function() {
    listItem.remove();
  });
  
  editButton.addEventListener('click', function() {
    const newTask = prompt('Edit the task:', task);
    if (newTask !== null && newTask.trim() !== '') {
      span.textContent = newTask;
    }
  });

  checkbox.addEventListener('change', function() {
    updateFilter();
  });
  
  updateFilter();
}

function updateFilter() {
  const todoItems = todoList.getElementsByTagName('li');
  
  for (let i = 0; i < todoItems.length; i++) {
    const item = todoItems[i];
    const checkbox = item.querySelector('input[type="checkbox"]');
    const isCompleted = checkbox.checked;
    
    switch (filter) {
      case 'all':
        item.style.display = 'flex';
        break;
      case 'completed':
        item.style.display = isCompleted ? 'flex' : 'none';
        break;
      case 'pending':
        item.style.display = isCompleted ? 'none' : 'flex';
        break;
    }
  }
}