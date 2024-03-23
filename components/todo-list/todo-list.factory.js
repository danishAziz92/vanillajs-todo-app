export function initTodoListItem(value) {
  let initialValue = value;
  let checked = false;

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
  }

  return {
    editTodo,
    saveTodo,
    cancelEditTodo,
    toggleStatusTodo,
    getTextValue: () => initialValue,
    getCheckedValue: () => checked,
  };
}
