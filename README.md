Little Todo app built using vanilla Js and Vite
Do npm run dev to start locally


Logic/ App flow::
There is a local todos state maintained in the observable store. On app load, data is fetched from 
localstorage/api and the local state is update. Now, there are 2 subscriber methods implemented,
renderList and updateTodoLocalStorage. Both these methods are fired via notify whenever the todo state is updated via the store state modifier functions. The only pure UI event which is click on edit button(shows cancel and save buttons) is implemented out of the observer store and is called in the event handler as it doesn't do anything to the state.
1: renderList which basically clears the todoContainer and then renders the list based on the latest local state of the todos. The renderList function internally creates nodes with the latest data provided to it from the notify fn, so it will make sure the right ui state attributes are selected based on the local state and is rendered in the container. As it re-renders the whole UI inside the list container, all the UI state of individual todo items will get reset to the initial state(EX: on cancel, all the cancel and save buttons of all the items will get reset to initial UI state, so this can't handle individual element update exclusively as the whole list gets updated).
P.S: Note that the status update, scratch effect is not done via JS, as we have utilized the in-built behavior of css to detect UI state changes of elements and update their css. This saves unnecessary Js code
2: updateTodoLocalStorage: Which takes the latest local todos state and saves it in the local-storage to make sure that the data is saved and persistent

The loadList function is called in the main.js file at the time of startup of the app, where it fetches data from the localStorage or API and passes it to the store modifier, loadTodos(fetched todos). This basically again saves the fetched data inside the local todos state and calls notify and the app renders/loads all the previously saved data on app load.



Structure::
Dynamic vs. Static Components
Dynamic Components:

Characteristics:
Manage their own state.
Handle user interactions.
Perform their own rendering.
Do not require explicit initialization outside their module.
Example:
todo-list.js manages the state of the todo items, subscribes to changes, and updates the UI accordingly.
Static Components:

Characteristics:
Primarily focus on presenting static content or simple UI elements.
Require explicit initialization to attach event listeners or perform other setup tasks.
Export a template and a component function.
Example:
header.js and filter.js export a template and provide a function to initialize the component and attach event listeners.


TODO::
1. Component Structure and Naming Conventions
File Naming: Use a consistent naming convention for your files. For instance, if you use todo-list.js, use todo-list-styles.css for its styles, and todo-list.factory.js for its factory. Similarly, for all components, use kebab-case.
Component Functions: Ensure every component has a clear, consistent way of initializing and handling its functionality. Even dynamic components should have an initialization function if they perform setup tasks.
Example for Dynamic Component Initialization:
// todo-list.js
export function initializeTodoList() {
    attachTodoListEventDelegator();
    todoStore.loadTodos(fetchTodos());
}
Example for Static Component Initialization:
// header.js
export function initializeHeader() {
    document.querySelector('#header-container').innerHTML = headerTemplate;
    headerComponent();
}
2. Consistent Initialization in Main.js
Initialize all components in a consistent manner in main.js.
import { initializeHeader } from './components/header/header.js';
import { initializeFooter } from './components/footer/footer.js';
import { initializeTodoList } from './components/todo-list/todo-list.js';

document.querySelector('#app').innerHTML = `
    <div id="header-container"></div>
    <div id="todo-list-container"></div>
    <div id="footer-container"></div>
`;

initializeHeader();
initializeFooter();
initializeTodoList();
3. Make localised UI updated rather than clearing the whole container using innerHTML






Issues:
1: One issue is that there is only 1 function to render/re-render the whole list for any actions performed on any list item. This is good as it is more readable and maintainable as it's a small application and load limited number of items in the list. In case the list was supposed to be huge or the rendering logic of each item was costly, then we would have to implement a logic which would handle the update of individual items making it more efficient. The app flow would be similar, but we would probably use pub-sub architecture to receive different types of events and call different UI modifying methods








Initial thought process::
Observer pattern for the todo app:
We will have a store factory. With a todo object which will store todo data keyed to uuids. On add, we will push todo data into this object. on other actions, we will need to pass uuid from the event handler to the store's state modifiers, which will get the todo data and modify them. Once we modify the state, we will have to notify functions which will perform certain UI and local storage updates.

For notify, below are the actions we need to perform:
1: edit: Fetch parent, pull the action buttons and toggle their visibility
2: cancel edit: Fetch parent, pull the row, update the row text. Pull action buttons and hide them
3: save
4: status
5: delete
6: add

//Looks like there are different types of UI actions needed to be performed. Like todo item action buttons toggle,
//status toggle, and adding/deleting todo rows from the list. Can't update any random UI element for any random state update
//Ex: If a todo is added, on it's notify I can't run the subscriber function which updates the toggle of todo item action button
//So I have 2 options:
1: Have a pub-sub pattern where topics will be the type of UI actions needed to be performed and accordingly we can fire it's subscriber
2: We can have a render function, which will clear the UI and re-render the list again with the latest todo list. But in this case, need to think about how to handle UI updates for individual todo item buttons, because that data is not stored in the store which will let the render function know that if we need to show/hide action buttons for a todo item or not. For this we will have to have the pub-sub method. Think more on this

Have to go with option 2 with pub-sub pattern

How to handle individual todo item UI updates.

Actions:
    1: Edit
        - UI: Fetch action buttons and make them visible
              Fetch it's input elem and make it enabled
        - State: None
    2: Cancel
        - UI: Fetch action buttons and hide them
              Fetch it's input elem, update it's value and make it disabled
        - State: None
    3: Save
        - UI: Fetch action buttons and hide them
        - State: Use uuid to get todo data and update it using it's current input elem's value. Think on the flow of these events

    4: Status
        - UI:
        - State: