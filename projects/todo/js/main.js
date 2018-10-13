"use strict";

// This is our controller it is responsible for rendering the view and action upon events
console.log("Todo");

function init() {
  createTodos();
  render();
}

function render() {
  renderTodos();
  renderStats();
}

function renderTodos() {
  var todos = getTodos();
  if (!todos[0] || todos === "") {
    document.querySelector(".todo-list").innerHTML = "<li>No Todos!</li>";
    return;
  }
  var strHtmls = todos.map(function(todo) {
    return `<li class="${
      todo.isDone ? "done" : ""
    } importance${todo.importance}" onclick="onTodoClicked('${todo.id}')">
                   ${todo.txt}
                   <button class="btn-delete" onclick="onDeleteTodo('${
                     todo.id
                   }', event)">
                      &times;
                    </button>
                </li>`;
  });
  document.querySelector(".todo-list").innerHTML = strHtmls.join("");
}

function renderStats() {
  document.querySelector(".todo-count").innerHTML = getTodoCount();
  document.querySelector(".active-count").innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
  toggleTodo(todoId);
  render();
}

function onSetFilter(statusFilter) {
  setFilter(statusFilter);
  render();
}
function onSetSort(statusSort) {
  setSort(statusSort);
  render();
}

function onAddTodo() {
  var elNewTodoTxt = document.querySelector("#newTodoTxt");
  if (elNewTodoTxt.value.trim() === "") return;
  var elImportance = document.querySelector("#importance");
  var newTodoTxt = elNewTodoTxt.value;
  var newTodoImportance = elImportance.value;
  addTodo(newTodoTxt, newTodoImportance);

  document.querySelector("h4").classList.add("animated", "tada");
  setTimeout(function() {
    document.querySelector("h4").classList.remove("animated", "tada");
  }, 1000);

  elNewTodoTxt.value = "";
  render();
}

function onDeleteTodo(todoId, ev) {
  // Stop the propegation of the click event so the LI onclick will not trigger
  ev.stopPropagation();
  deleteTodo(todoId);
  render();
}
