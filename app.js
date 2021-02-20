//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo)
//Functions

function addTodo (event) {
    //Prevent Form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create LI 
    const newTodo  = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    //ADD todo to local storage
    saveLocalTodos(todoInput.value);

    //Check Mark Button
    const complettedButton = document.createElement('button');
    complettedButton.innerHTML='<i class="fas fa-check"></i>';
    complettedButton.classList.add('complete-btn');
    todoDiv.appendChild(complettedButton);

    //Check TRASH  Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);

    //Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(event){
    event.preventDefault();
    const item=event.target;
    //Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check Mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
 
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                }
                else{
                        todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos (todo) {
    //CHECK--- Hey do I already have hings in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',  JSON.stringify(todos));
}

function getTodos() {
    //CHECK--- Hey do I already have hings in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create LI 
        const newTodo  = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo); 
 
        //Check Mark Button
        const complettedButton = document.createElement('button');
        complettedButton.innerHTML='<i class="fas fa-check"></i>';
        complettedButton.classList.add('complete-btn');
        todoDiv.appendChild(complettedButton);

        //Check TRASH  Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){ // Div is getting passed here in todo
     //CHECK--- Hey do I already have hings in there?
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }
     else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem('todos',JSON.stringify(todos)); // Make changes in Local Storage
}