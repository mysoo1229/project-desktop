const KEY_TODO = "todos";

const todoForm = document.getElementById('todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todoList');
const buttonRemove = todoList.querySelectorAll('button');
const savedTodos = localStorage.getItem(KEY_TODO);

let todos = [];

const setTodo = {
  checkItem: (e) => {
    const checkStatus = e.target.checked;
    const targetId = parseInt(e.target.closest('li').id);
    const targetIndex = todos.map(item => item.id).indexOf(targetId);
    todos[targetIndex].checked = checkStatus;
    localStorage.setItem(KEY_TODO, JSON.stringify(todos));
  },
  saveItem: () => {
    localStorage.setItem(KEY_TODO, JSON.stringify(todos));
  },
  removeItem: e => {
    const targetLi = e.target.parentNode;
    targetLi.remove();
    todos = todos.filter(item => item.id !== parseInt(targetLi.id));
    setTodo.saveItem();
  },
  addItem: newTodoObj => {
    const newLi = document.createElement('li');
    const newLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    const newSpan = document.createElement('span');
    const newButton = document.createElement('button');

    newLi.appendChild(newLabel);
    newLi.appendChild(newButton);
    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(newSpan);
    newLi.id = newTodoObj.id;
    newSpan.innerText = newTodoObj.text;
    newCheckbox.setAttribute('type', 'checkbox');
    todoList.appendChild(newLi);

    if (newTodoObj.checked === true) {
      newCheckbox.setAttribute('checked', '');
    } else {
      newCheckbox.removeAttribute('checked');
    }

    newButton.addEventListener('click', setTodo.removeItem);
    newCheckbox.addEventListener('change', setTodo.checkItem);
  },
  submit: e => {
    e.preventDefault();
    const newTodo = todoInput.value;
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
      checked: false
    }

    todoInput.value = '';
    todos.push(newTodoObj);
    setTodo.addItem(newTodoObj);
    setTodo.saveItem();
  }
};

todoForm.addEventListener('submit', setTodo.submit);

if (savedTodos !== null) {
  const parseTodos = JSON.parse(savedTodos);
  todos = parseTodos;
  parseTodos.forEach(setTodo.addItem);
}
