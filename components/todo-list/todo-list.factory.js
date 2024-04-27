import { handleTodoStorage } from "../../util.js";
import { v4 as uuidv4 } from "uuid";

export function initTodoStore() {
/*   let initialValue = data.todoText;
  let checked = data.checked;
  let uuid = data.uuid; */

  let todos = {};
  const listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  const notify = () => {
    listeners.forEach( listener => listener(todos))
  }

  const addTodo = (todoText) => {
    const uuid = uuidv4();
    todos[uuid] = { todoText, checked: false };
    notify();
  };

  const loadTodos = () => {
    //Get todos from localstorage or API, and push into the todos array/state on app load and fire notify. From there only use addTodo to add
    //todo data to the state and in this fire notify. A render function will be subscribed to the store, in which we will
    //pass the local store data and render todos according to that
    const fetchedTodos = JSON.parse(localStorage.getItem("todos"));
    //Todo data structure needs to be changed to uuid:{text, checked} as per new store structure and needs to be same in local
    //and the DB
    fetchedTodos && (todos = {...fetchedTodos});
    notify();
  }

  const deleteTodo = (uuid) => {
    delete todos[uuid];
    notify();
  }
























  //---------------------------------old code--------------------------------------->

  const editTodo = (parentNode) => {
    console.log("factory: editing Todo", initialValue);
    parentNode.querySelector(".todo-list-input").disabled = false;
    const onEditButtons = parentNode.querySelectorAll(
      ".cancel-button, .save-button"
    );
    onEditButtons.forEach((buttonElem) => {
      buttonElem.style.visibility = "visible";
    });
  };

  const saveTodo = (parentNode) => {
    console.log("factory: saving Todo", initialValue);
    initialValue = parentNode.querySelector(".todo-list-input").value;
    parentNode.querySelector(".todo-list-input").disabled = true;
    const onEditButtons = parentNode.querySelectorAll(
      ".cancel-button, .save-button"
    );
    onEditButtons.forEach((buttonElem) => {
      buttonElem.style.visibility = "hidden";
    });
    if (checked) {
      checked = false;
      parentNode.style.textDecoration = "";
      parentNode.querySelector(".todo-list-checkbox").checked = false;
    }

    handleTodoStorage({ todoText: initialValue, checked, uuid }, "update");
  };

  const cancelEditTodo = (parentNode) => {
    console.log("factory: cancel clicked");
    parentNode.querySelector(".todo-list-input").value = initialValue;
    parentNode.querySelector(".todo-list-input").disabled = true;
    const onEditButtons = parentNode.querySelectorAll(
      ".cancel-button, .save-button"
    );
    onEditButtons.forEach((buttonElem) => {
      buttonElem.style.visibility = "hidden";
    });
  };

  const toggleStatusTodo = (parentNode) => {
    checked = !checked;
    //TODO instead of doing the below DOM op, we can use the auto event handler of css which is checkbox class:checked + input box
    //This will use css's built in event handler which will check if the checkbox is checked, then apply certain CSS to it's sibling
    parentNode.style.textDecoration = checked ? "line-through" : "";
    handleTodoStorage({ todoText: initialValue, checked, uuid }, "update");
  };

  /* const deleteTodo = (parentNode) => {
    parentNode.remove();
    handleTodoStorage(uuid, "delete");
  }; */

  return {
    editTodo,
    saveTodo,
    cancelEditTodo,
    toggleStatusTodo,
    deleteTodo,
    subscribe,
    addTodo,
    loadTodos
  };
}
