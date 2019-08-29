  // To do function from here
  
  let todoItems = [];

  function addTodo(text,comment) {
    const todo = {
      text,
      comment,
      checked: false,
      id: Date.now(),
    };


    todoItems.push(todo);

     firebase.database().ref('todolist/cooking').push({
        taskName:text,
        taskComment:comment,
        checked:false
        // id:id
      })
    
    const list = document.querySelector('.js-todo-list');
    list.insertAdjacentHTML('beforeend', `
    <ons-list-item class="todo-item" data-key="${todo.id}"> <div class="center list-item__center">
  <input id="${
        todo.id
      }" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <span class="todo-itemComment">${todo.comment}</span>
      <button class="openDetails" name="showmodalbutton" onclick="showModal(this)">
      詳細
  </button>
  <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
  </button></div>
  </ons-list-item>
    `);
    loadPage('home.html');

    
  }
  
  function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
  
    const item = document.querySelector(`[data-key='${key}']`);
    if (todoItems[index].checked) {
      item.classList.add('done');
      // document.querySelector
    } else {
      item.classList.remove('done');
    }
  }
  
  function deleteTodo(key) {
    todoItems = todoItems.filter(item => item.id !== Number(key));
    const item = document.querySelector(`[data-key='${key}']`);
    item.remove();
    
    const list = document.querySelector('.js-todo-list');
    if (todoItems.length === 0) list.innerHTML = '';
  }
  
  const form = document.querySelector('.js-form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector('.js-todo-input');
    console.log(input);
    const comment = input.value.trim();
    console.log(comment);

    const selector = document.querySelector('.js-todo-selector div');
    console.log(selector);
    const text = selector.textContent.trim();
    console.log(text);

    
    if (text !== 'タスクを選ぶ') {
      addTodo(text,comment);
      selector.textContent = 'タスクを選ぶ';
      input.value = '';
    } 
    else {
      var msg = "タスクは選択されていません。";
      var d1 = document.querySelector(".js-form div.warningMsg");
      d1.innerHTML = msg;
    }

  });
  
  const list = document.querySelector('.js-todo-list');
  list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
      const itemKey = event.target.parentElement.parentElement.dataset.key;
      // console.log(event.target.parentElement.parentElement.tagName);

      toggleDone(itemKey);
    }
    
    if (event.target.classList.contains('js-delete-todo')) {
      const itemKey = event.target.parentElement.parentElement.dataset.key;
      // console.log(event.target.parentElement.dataset);
      deleteTodo(itemKey);
    }
  
  });