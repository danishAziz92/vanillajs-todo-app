import './footer-styles.css'
import { todoStore } from "../todo-list/todo-list.js";

export const footerTemplate = `
<div class="footer footer-container">
    <form id="add-todo-form" method="POST">
        <div class="add-item-container">
            <input id="todo-item" name="todo-item" type="text" placeholder="Add your todo item here ...">
            <button type="submit">Add</button>
        </div>
    </form>
</div>
`

export function footerComponent(){
    //const TodoList = new TodoListComponent();

    document.getElementById("add-todo-form").addEventListener("submit", handleAddTodo);

    function handleAddTodo(event){
        event.preventDefault();
        const todoInput = document.getElementById("todo-item");
        //addTodo will handle the uuid and state creation in the store
        todoInput.value && todoStore.addTodo(todoInput.value);
        todoInput.value = "";
    }
}