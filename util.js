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