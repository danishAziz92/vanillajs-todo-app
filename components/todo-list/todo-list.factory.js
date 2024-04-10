import { handleTodoStorage } from "../../util.js"

export function initTodoListItem(data) {
  let initialValue = data.inputText;
  let checked = data.checked;
  let uuid = data.uuid;

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
    if(checked){
      checked = false;
      parentNode.style.textDecoration = "";
      parentNode.querySelector(".todo-list-checkbox").checked = false;
    }

    handleTodoStorage({inputText: initialValue, checked, uuid}, "update");
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
    parentNode.style.textDecoration = checked ? "line-through" : "";
    handleTodoStorage({inputText: initialValue, checked, uuid}, "update");
  }

  const deleteTodo = (parentNode) => {
    parentNode.remove();
    handleTodoStorage(uuid, "delete");
  }

  return {
    editTodo,
    saveTodo,
    cancelEditTodo,
    toggleStatusTodo,
    deleteTodo
  };
}
