import { v4 as uuidv4 } from "uuid";

import "./todo-list-styles.css";
import { appendNode, elementFromTemplateString } from "../../util.js";
import { initTodoListItem } from "./todo-list.factory.js";

const todoStateMap = {};

export function addItemToList(inputText) {
  const uuid = uuidv4();
  const todoState = initTodoListItem(inputText);
  todoStateMap[uuid] = todoState;
  const listContainerElement = document.getElementById("todo-list-container");
  appendNode(listContainerElement, getTodoListItemNode(todoState, uuid));
}

export function attachTodoListEventDelegator() {
  const listContainerElement = document.getElementById("todo-list-container");
  listContainerElement.addEventListener("click", handleListItemEvents);
}

function handleListItemEvents(e) {
  console.log("event captured", e.target);
  const parentNode = e.target.parentNode;
  const todoId = parentNode.dataset.id;
  const action = e.target.getAttribute("data-action");

  switch (action) {
    case "edit":
      todoStateMap[todoId].editTodo(parentNode);
      break;

    case "cancel":
      todoStateMap[todoId].cancelEditTodo(parentNode);
      break;

    case "save":
      todoStateMap[todoId].saveTodo(parentNode);
      break;
    
    case "status":
      todoStateMap[todoId].toggleStatusTodo(parentNode);
      break;

    default:
      break;
  }
}

function getTodoListItemNode(todoListItem, uuid) {
  const todoListItemTemplate = `<div class="todo-list-item" data-id="${uuid}">
        <input 
            type="checkbox"
            class="todo-list-checkbox"
            name="todoListCheckbox"
            data-action="status"
            ${todoListItem.getCheckedValue() && "checked"}
            />

        <input
            type="text"
            class="todo-list-input"
            name="todoListInput"
            value="${todoListItem.getTextValue()}"
            disabled
            aria-label="todo list item text"
        />
        <button data-action="edit" class="edit-button"></button>
        <button data-action="cancel" class="on-edit-button cancel-button">Cancel</button>
        <button data-action="save" class="on-edit-button save-button">Save</button>
    </div>
    `;
  return elementFromTemplateString(todoListItemTemplate);
}

//I need to attach an event listener on the todo list container so that I can listen for clicks on edit button
//and do anything. I can't just write an event listener function in this file to be executed when it's
//being parsed during dependency resolution, because at that time the main.js file wouldn't be read
//and the todo list container element wouldn't be pushed into the DOM yet. SO I need to apply this listener
//at a later time, which means I will have to wrap it in a function and call it at some other time.

//If I call it in the addItemTolist then it will be fired at every add click, which is no no

//If I add a function to attach listener, I will have to import it somewhere and call it. Where would that be:

//It can be inside footer comp, but it doesn't make sense for such coupling.

//I can call it inside the main.js as a function to attach all event listeners as, the main components would
//be rendered in it and then i'll attach the listeners. Which makes sense, but think if it's elegant????

//If I make a factory component here and on it's initialization attach the listener. There are 2 problems
//1 the addTolist function will be a member function and I will have to import it in footer via initialsing
//the factory comp which will apply the event listener automatically, which is a side effect we should avoid.
//Because wherever I initialize this comp to use it's member functions, it will apply the listener which
//is redundant. I can attach listener inside a member function, but that is also memory taking space everytime
//the comp is initialised for a function which needs to run only once.

//I think we should implement this function standalone so that it can be imported once where it needs to be called



//old Code
//TODO: Review this logic and design choice
//Will need to store key value pairs in this object. For key will need to either create a row id
//which will represent each todo which will never be changed. On edit, store the
//id as key and as text as value. On cancel, check the target element's id in the map
//and use it's value.
//or store the node text as a data-original value and on cancel fetch it and directly store in input value
//mind that on save you'll need to update this data attr with the update value as original
/* const originalTodoValue = {
    val: "",
}; */


//Old Code. Wasn't scalable and had a bug due to absence of individual state management for indv. todos

/* function handleEdit(parentNode) {
  console.log("edit clicked", originalTodoValue);
  const inputElem = parentNode.querySelector(".todo-list-input");
  originalTodoValue.val = inputElem.value;
  inputElem.disabled = false;
  const onEditButtons = parentNode.querySelectorAll(
    ".cancel-button, .save-button"
  );
  onEditButtons.forEach((buttonElem) => {
    buttonElem.style.visibility = "visible";
  });
  //TODO: Hide edit button
}

function handleCancel(parentNode) {
  //need to restore to previous state
  console.log("cancel clicked");
  originalTodoValue.val && (parentNode.querySelector(".todo-list-input").value = originalTodoValue.val);
  parentNode.querySelector(".todo-list-input").disabled = true;
  const onEditButtons = parentNode.querySelectorAll(
    ".cancel-button, .save-button"
  );
  onEditButtons.forEach((buttonElem) => {
    buttonElem.style.visibility = "hidden";
  });
}

function handleSave() {
  //Will have to update store when the app becomes stateful
  console.log("save clicked");
} */