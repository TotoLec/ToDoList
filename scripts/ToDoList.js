// Selectors
const todoInput = document.querySelector('#inputBar');
const todoAddButton = document.querySelector('#addButton');
const todoListContainer = document.querySelector('#tasks-container');
const todoFilter = document.querySelector('#filterSelector');
const todoSearch = document.querySelector('#inputSearch');

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoAddButton.addEventListener('click', addTodo);
todoListContainer.addEventListener('click', deleteCheck);
todoFilter.addEventListener('change', filterTodo);
todoSearch.addEventListener('keyup', searchTodo);

// Functions

function checkIfTodoExist(e){
    console.log(todoListContainer.children.length);
    const zeroTaskMsg = document.createElement('h2');
    zeroTaskMsg.innerHTML = 'Liste vide';
    if (todoListContainer.children.length === 0) {
        todoListContainer.appendChild(zeroTaskMsg);
    } else {

    }
}

function addTodo(event){
    event.preventDefault();
    
    if (!todoInput.value == "") {
        // alert(todoInput.value);
        
        // ToDo Content
        const todoDiv = document.createElement('div');
        todoDiv.setAttribute("id", "task");
        
        // Label
        const todoLabel = document.createElement('label');
        // Input
        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute("type", "checkbox");
        // Span
        const todoSpan = document.createElement('span');
        todoSpan.innerHTML = todoInput.value;
        // ADD TASK TO LOCALSTORAGE
        saveLocalTodos(todoInput.value);
        
        todoLabel.appendChild(todoCheckbox);
        todoLabel.appendChild(todoSpan);
        todoDiv.appendChild(todoLabel);
        
        // Button
        const todoDeleteButton = document.createElement('button');
        todoDeleteButton.innerHTML = '<i class="ph ph-trash"></i>';
        todoDiv.appendChild(todoDeleteButton);
        
        todoListContainer.appendChild(todoDiv);
        
        // Clear TodoInput Value
        todoInput.value = "";
    }
    
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;
    // Delete Todo
    if (item.classList[1] === 'ph-trash') {
        const task = item.closest('#task');
        // Animation
        task.classList.add("deleteAnimation")
        removeLocalStorageTodo(task)
        task.addEventListener('transitionend', function(){
            task.remove();
        })
    }
    
    // Check Todo
    if (item.getAttribute("type") === 'checkbox') {
        item.closest('#task').classList.toggle("checked");
    }
}

function filterTodo(e){
    const todos = todoListContainer.childNodes;
    todos.forEach(function(todo){
        if (todo.id === "task"){
            switch (e.target.value) {
                case "all":
                todo.style.display = 'flex';
                break;
                
                case "completed":
                if (todo.classList.contains("checked")) {
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
                
                case "uncompleted":
                if (!todo.classList.contains("checked")) {
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
                
                default:
                break;
            }
        }
    });
}

function searchTodo(e){
    const todos = todoListContainer.childNodes;
    todos.forEach(function(todo){
        if (todo.id === "task"){
            const taskName = todo.childNodes[0].childNodes[1].innerHTML
            if (taskName.includes(todoSearch.value)){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
            }
        }
    });
}

function saveLocalTodos(todo){
    // Check if localstorage already exist
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    // Save
    tasks.push(todo);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTodos(){

    // Check if localstorage already exist
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(todo) {
        // ToDo Content
        const todoDiv = document.createElement('div');
        todoDiv.setAttribute("id", "task");
        
        // Label
        const todoLabel = document.createElement('label');
        // Input
        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute("type", "checkbox");
        // Span
        const todoSpan = document.createElement('span');
        todoSpan.innerHTML = todo;
        
        todoLabel.appendChild(todoCheckbox);
        todoLabel.appendChild(todoSpan);
        todoDiv.appendChild(todoLabel);
        
        // Button
        const todoDeleteButton = document.createElement('button');
        todoDeleteButton.innerHTML = '<i class="ph ph-trash"></i>';
        todoDiv.appendChild(todoDeleteButton);
        
        todoListContainer.appendChild(todoDiv);
    })

    checkIfTodoExist();
}

function removeLocalStorageTodo(todo){
    // Check if localstorage already exist
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    task = todo.children[0].children[1].innerHTML;
    let index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    console.log(tasks);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}