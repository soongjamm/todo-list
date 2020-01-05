const todoForm = document.querySelector(".todo-form"),
    todoInput = document.querySelector(".todoInput"),
    todoList = document.querySelector(".todoList");

let todos = [];
const TODOS_LS = 'todos';

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function loadTodos() {
    const loadedTodos = JSON.parse(window.localStorage.getItem(TODOS_LS));
    if (loadedTodos !== null) {
        loadedTodos.forEach((todo) => {
            addTodo(todo.text);
        })
    }
}

function addTodo(text) {
    const newTodo = text;
    const newId = todos.length + 1;
    const todoObj = {
        text: newTodo,
        id: newId
    }
    const editBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const list = document.createElement('li');
    const span = document.createElement('span');
    const editForm = document.createElement('form');
    const tf = document.createElement('input');

    span.innerText = newTodo;
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
    delBtn.innerHTML = `<i class="fas fa-times"></i>`;

    editForm.classList.add('edit-form');
    tf.classList.add('editInput');
    tf.classList.add('hide');
    list.classList.add('list');

    list.appendChild(editForm);
    editForm.appendChild(tf);
    list.appendChild(span);
    list.appendChild(editBtn);
    list.appendChild(delBtn);
    list.id = newId;

    editForm.addEventListener('submit', editSubmit);
    editBtn.addEventListener('click', editTodo);
    delBtn.addEventListener('click', deleteTodo);

    todoList.appendChild(list);
    todos.push(todoObj);
    saveTodos();
    // console.log(span.innerText)
}

function editSubmit(event) {
    event.preventDefault();

    // html 화면상 처리
    const list = event.currentTarget.parentNode;
    const span = list.querySelector('span');
    const editInput = event.currentTarget.querySelector('.editInput');
    const editBtn = list.querySelector('button')
    const tf = list.querySelector('input');

    span.innerText = editInput.value;
    editInput.value = "";

    // LS에 저장되는 데이터 처리
    todos.forEach((todo) => {
        if (todo.id === parseInt(list.id)) {
            todo.text = span.innerText;
            saveTodos();
        }

    })

    tf.classList.toggle('hide');
    span.classList.toggle('hide');
    editBtn.classList.toggle('hide');
}

function editTodo(event) {
    const list = event.currentTarget.parentNode;
    const tf = list.querySelector('input');
    const span = list.querySelector('span');
    const editBtn = list.querySelector('button')
    tf.value = span.innerText;
    span.classList.toggle('hide');
    tf.classList.toggle('hide');
    editBtn.classList.toggle('hide');
}

function deleteTodo(event) {
    const list = event.currentTarget.parentNode;
    const cleanTodos = todos.filter((todo) => todo.id !== parseInt(list.id));
    todoList.removeChild(list);
    todos = cleanTodos;
    saveTodos();
}

function handleSubmit(event) {
    event.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = "";
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();