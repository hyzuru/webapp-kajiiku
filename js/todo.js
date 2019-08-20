  // To do function from here
  
  let todoItems = [];
  
  function addTodo(text) {
    const todo = {
      text,
      checked: false,
      id: Date.now()
    };

    todoItems.push(todo);
    console.log(todoItems);
    const list = document.querySelector(".js-todo-list");
    list.insertAdjacentHTML(
      "beforeend",
      `
    <ons-list-item class="todo-item" data-key="${todo.id}"> <input id="${
        todo.id
      }" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span></ons-list-item>
    `
    );
  }

  const form = document.querySelector(".js-form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector(".js-todo-input");

    const text = input.value.trim();
    if (text !== "") {
      addTodo(text);
      input.value = "";
      input.focus();
    }
  });