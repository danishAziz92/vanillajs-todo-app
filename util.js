export function appendNode(container, node){
    //Append the new element to the passed container. Use document.body.appendChild() for ex;
    container.appendChild(node);
}

export function deleteNode(container, node){
    //Delete the passed node from the passed container
}

export function elementFromTemplateString(templateString){
    //Logic to crete HTML element from the passed template string for better intellisense
    const template = document.createElement("template");
    template.innerHTML = templateString.trim();
    return template.content.firstElementChild;
}

export function handleTodoStorage(value, action) {
    //Logic to Add, update and delete an object inside local storage
    switch (action) {
        case "create":
            localStorage.setItem("todos", JSON.stringify(value))
            break;

        case "add":
            addTodo(value)
            break;

        case "update":
            updateTodo(value);
            break;

        case "delete":
            deleteTodo(value);
            break;

        default:
            break;
    }
}

function addTodo(value){
    const existingData = JSON.parse(localStorage.getItem("todos"));
    existingData.push(value);
    localStorage.setItem("todos", JSON.stringify(existingData));
}

function updateTodo(item) {
    const currentTodos = JSON.parse(localStorage.getItem("todos"));
    const todoToUpdate = currentTodos.filter( todo => todo.uuid === item.uuid);
    todoToUpdate[0].inputText = item.inputText;
    todoToUpdate[0].checked = item.checked;
    localStorage.setItem("todos", JSON.stringify(currentTodos));
}

function deleteTodo(uuid) {
    const currentTodos = JSON.parse(localStorage.getItem("todos"));
    const updatedTodoList = currentTodos.filter( todo => todo.uuid !== uuid);
    localStorage.setItem("todos", JSON.stringify(updatedTodoList));
}