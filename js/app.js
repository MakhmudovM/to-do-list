const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle img');
const body = document.body;
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const itemsLeft = document.querySelector('.items-left');
const filters = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('.clear-completed');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeIcon.src = 'img/sun-svgrepo-com.svg';
        themeIcon.alt = 'Light Theme';
    } else {
        themeIcon.src = 'img/moon-svgrepo-com.svg';
        themeIcon.alt = 'Dark Theme';
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim() !== '') {
        addTodoItem(todoInput.value.trim());
        todoInput.value = '';
        updateItemsLeft();
    }
});

function addTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <div class="left-section">
            <div class="radio-btn" onclick="toggleComplete(this)"></div>
            <span>${text}</span>
        </div>
        <button onclick="removeTodoItem(this)">❌</button>
    `;
    todoList.appendChild(li);
    updateItemsLeft();
}

function toggleComplete(radio) {
    const li = radio.closest('.todo-item');
    li.classList.toggle('completed');
    radio.classList.toggle('checked');
    updateItemsLeft();
}

function removeTodoItem(button) {
    const li = button.closest('.todo-item');
    li.remove();
    updateItemsLeft();
}

function updateItemsLeft() {
    const count = document.querySelectorAll('.todo-item:not(.completed)').length;
    itemsLeft.textContent = `${count} items left`;
}

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(btn => btn.classList.remove('active'));
        filter.classList.add('active');
        filterTodos(filter.getAttribute('data-filter'));
    });
});

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

clearCompletedBtn.addEventListener('click', () => {
    const completedItems = document.querySelectorAll('.todo-item.completed');
    completedItems.forEach(item => item.remove());
    updateItemsLeft();
});
