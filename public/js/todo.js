  // To do function from here
  
  let todoItems = [];

  function addTodo(text, comment, category) {
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
    loadPage('home.html'); 
  }
  // function toggleDone(key) {
  //   const index = todoItems.findIndex(item => item.id === Number(key));
  //   todoItems[index].checked = !todoItems[index].checked;
  
  //   const item = document.querySelector(`[data-key='${key}']`);
  //   if (todoItems[index].checked) {
  //     item.classList.add("done");
  //     // document.querySelector
  //   } else {
  //     item.classList.remove("done");
  //   }
  
  // }
  
  // function deleteTodo(key) {
  //   todoItems = todoItems.filter(item => item.id !== Number(key));
  //   const item = document.querySelector(`[data-key='${key}']`);
  //   item.remove();
  
  //   const list = document.querySelector(".js-todo-list");
  //   if (todoItems.length === 0) list.innerHTML = "";
  // }
  

  
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

    const getCategory = document.querySelector(".js-todo-selector div div")
    .outerHTML;
  console.log(getCategory);
  console.log(
    getCategory
      .split('="')
      .pop()
      .split('"')[0]
  );
  const category = getCategory
    .split('="')
    .pop()
    .split('"')[0];    

    if (text !== "タスクを選ぶ") {
      addTodo(text, comment, category);
      selector.textContent = "タスクを選ぶ";
      input.value = "";
    } else {
      var msg = "タスクは選択されていません。";
      var d1 = document.querySelector(".js-form div.warningMsg");
      d1.innerHTML = msg;
    }

  });
  
  // const list = document.querySelector('.js-todo-list');
  // list.addEventListener('click', event => {
  //   // if (event.target.classList.contains('js-tick')) {
  //   //   const itemKey = event.target.parentElement.parentElement.dataset.key;
  //   //   console.log(event.target.parentElement.parentElement.tagName);

  //   //   toggleDone(itemKey);
  //   // }
    
  //   // if (event.target.classList.contains('js-delete-todo')) {
  //   //   const itemKey = event.target.parentElement.parentElement.dataset.key;
  //   //   console.log(event.target.parentElement.dataset);
  //   //   // deleteTodo(itemKey);
  //   // }
  
  // });

//   function showModal(el) {
            
//     var elname = el.tagName ;
//     // get text of the item that was clicked
//     console.log(elname);
//     var inputTag = el.parentNode.firstChild;
//     // console.log(inputTag.tagName);
//     var dataKey = inputTag.getAttribute('id');
//     console.log(inputTag.getAttribute('id'));

//     var todoTextLabel = el.parentElement.querySelector('span.todo-itemName').textContent;
//     console.log(todoTextLabel);

//     var todoTextComment = el.parentElement.querySelector('span.todo-itemComment').textContent;
//       var todoTextComment = todoTextComment.replace(/\s+/g, '');
//       if (todoTextComment != "") {
//         todoTextComment = todoTextComment.replace(/\s+/g, '');
//       } else {
//         // console.log(todoTextComment);
//         todoTextComment = "コメントなし"
//       }
//       console.log(todoTextComment);
//     // display the modal

//   var modal = document.querySelector('ons-modal.taskDetailsModal');
//   modal.show();
         
//   var mText = modal.querySelector('p') ;

//   mText.innerHTML =  todoTextLabel;
//   mText.innerHTML =  "<div class='noDisplay'>" + dataKey+"</div>"+todoTextLabel;
//   mText.innerHTML += "<br><div class='todo-hLine'></div><br>"+todoTextComment;

//   var closeButton = document.querySelector('.closeBtn');
//   closeButton.onclick = function(){
//     // var modal = document.querySelector('ons-modal');
//     modal.hide();
//   };            
// }
