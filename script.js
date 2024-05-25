const input = document.querySelector(".input");
const btnAdd = document.querySelector(".btn-add");
const todoList = document.querySelector(".todo-list");
const completedList = document.querySelector(".completed-list");

const todoListArray = JSON.parse(localStorage.getItem("todoListArray")) || [];
const completedListArray =
  JSON.parse(localStorage.getItem("completedListArray")) || [];

btnAdd.addEventListener("click", function () {
  todoListArray.push(input.value);
  localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
  location.reload();
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    todoListArray.push(input.value);
    localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
    location.reload();
  }
});

function createTodoListItem(id, item) {
  const li = document.createElement("li");
  li.id = id;

  const span = document.createElement("span");
  span.innerText = item;

  const btnDone = document.createElement("button");
  btnDone.innerText = "Done";
  btnDone.className = "btn-done";

  li.appendChild(span);
  li.appendChild(btnDone);

  todoList.appendChild(li);
}

function createCompletedListItem(id, item) {
  const li = document.createElement("li");
  li.id = id;

  const span = document.createElement("span");
  span.innerText = item;

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.className = "btn-delete";

  li.appendChild(span);
  li.appendChild(btnDelete);

  completedList.appendChild(li);
}

todoList.addEventListener("click", (e) => {
  if (e.target.className === "btn-done") {
    const id = e.target.parentElement.id;
    const newItem = todoListArray.splice(id, 1);
    completedListArray.push(newItem);
    localStorage.setItem(
      "completedListArray",
      JSON.stringify(completedListArray)
    );
    localStorage.setItem("todoListArray", JSON.stringify(todoListArray));
    location.reload();
  }
});

completedList.addEventListener("click", (e) => {
  if (e.target.className === "btn-delete") {
    const id = e.target.parentElement.id;
    completedListArray.splice(id, 1);
    localStorage.setItem(
      "completedListArray",
      JSON.stringify(completedListArray)
    );
    location.reload();
  }
});

(function updateDOM() {
  if (todoListArray.length > 0) {
    for (const key in todoListArray) {
      createTodoListItem(key, todoListArray[key]);
    }
  } else if (todoListArray.length === 0) {
    todoList.innerText = "Add an item using the input field above";
  }
  if (completedListArray.length > 0) {
    for (const key in completedListArray) {
      createCompletedListItem(key, completedListArray[key]);
    }
  }
})();
