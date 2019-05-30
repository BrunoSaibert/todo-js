var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
  listElement.innerHTML = '';

  for (todo of todos) {
    var todoElement = document.createElement('li');
    var todoSpanElement = document.createElement('span');
    var todoText = document.createTextNode(todo.text);
    var pos = todos.indexOf(todo);

    //Cria o elemento para finalizar a tarefa
    var inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('onclick', `doneTodo(this, ${pos})`);

    //Se já estiver feita a tarefa
    if (todo.done) {
      inputElement.setAttribute('checked', 'checked');
      todoSpanElement.setAttribute('class', 'done');
    }

    //Encapsular no SPAN
    todoSpanElement.appendChild(inputElement);
    todoSpanElement.appendChild(todoText);

    //Cria o elemento para deletar a tarefa
    var linkElement = document.createElement('a');
    linkElement.setAttribute('title', 'Excluir tarefa');
    linkElement.setAttribute('href', '#');
    linkElement.setAttribute('onclick', `deleteTodo(${pos})`);
    var linkText = document.createTextNode('✕');
    linkElement.appendChild(linkText);

    //Adiociona na LI os elementos criados
    todoElement.appendChild(todoSpanElement);
    todoElement.appendChild(linkElement);

    //Adiociona na UL os elementos criados
    listElement.appendChild(todoElement);
  }
}
renderTodos();

function addTodo() {
  var todoText = inputElement.value;

  var element = {};
  element.text = todoText;
  element.done = false;

  todos.push(element);
  inputElement.value = '';
  renderTodos();
  saveToStorage();
}

buttonElement.onclick = addTodo;

function doneTodo(element, pos) {
  element.parentElement.classList.toggle('done');
  todos[pos].done = !todos[pos].done;
  saveToStorage();
}

function deleteTodo(pos) {
  todos.splice(pos, 1);
  renderTodos();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('list_todos', JSON.stringify(todos));
}