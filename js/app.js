const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle img');
const body = document.body;
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.querySelector('.items-left');
const filters = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('.clear-completed');

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadTheme();
});
themeToggle.addEventListener('click', toggleTheme);
todoInput.addEventListener('keypress', handleKeyPress);
clearCompletedBtn.addEventListener('click', clearCompleted);

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(btn => btn.classList.remove('active'));
        filter.classList.add('active');
        filterTodos(filter.getAttribute('data-filter'));
    });
});

function toggleTheme() {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeIcon.src = 'img/sun-svgrepo-com.svg';
        themeIcon.alt = 'Light Theme';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.src = 'img/moon-svgrepo-com.svg';
        themeIcon.alt = 'Dark Theme';
        localStorage.setItem('theme', 'light');
    }
}

function handleKeyPress(e) {
    if (e.key === 'Enter' && todoInput.value.trim() !== '') {
        addTodoItem(todoInput.value.trim());
        todoInput.value = '';
        updateItemsLeft();
        saveTodos();
    }
}

function addTodoItem(text, completed = false) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (completed) li.classList.add('completed');
    li.innerHTML = `
        <div class="left-section">
            <div class="radio-btn ${completed ? 'checked' : ''}" onclick="toggleComplete(this)"></div>
            <span>${text}</span>
        </div>
        <button onclick="removeTodoItem(this)"><img src="./img/trash-bin-minimalistic-svgrepo-com.svg" alt="trash back" width="25" height="25"></button>
    `;
    todoList.appendChild(li);
    updateItemsLeft();
}

function toggleComplete(radio) {
    const li = radio.closest('.todo-item');
    li.classList.toggle('completed');
    radio.classList.toggle('checked');
    updateItemsLeft();
    saveTodos();
}

function removeTodoItem(button) {
    const li = button.closest('.todo-item');
    li.remove();
    updateItemsLeft();
    saveTodos();
}

function updateItemsLeft() {
    const count = document.querySelectorAll('.todo-item:not(.completed)').length;
    itemsLeft.textContent = `${count} items left`;
}

function filterTodos(filter) {
    const items = document.querySelectorAll('.todo-item');
    items.forEach(item => {
        switch (filter) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'active':
                item.style.display = item.classList.contains('completed') ? 'none' : 'flex';
                break;
            case 'completed':
                item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

function clearCompleted() {
    const completedItems = document.querySelectorAll('.todo-item.completed');
    completedItems.forEach(item => item.remove());
    updateItemsLeft();
    saveTodos();
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        savedTodos.forEach(todo => addTodoItem(todo.text, todo.completed));
        updateItemsLeft();
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.src = 'img/sun-icon.png';
        themeIcon.alt = 'Light Theme';
    } else {
        body.classList.remove('dark-theme');
        themeIcon.src = 'img/moon-icon.png';
        themeIcon.alt = 'Dark Theme';
    }
}
