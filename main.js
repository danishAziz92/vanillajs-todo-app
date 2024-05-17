import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.js'
import { headerTemplate } from './components/header/header.js'
import { footerTemplate, footerComponent } from './components/footer/footer.js'
import { attachTodoListEventDelegator, todoStore, fetchTodos } from "./components/todo-list/todo-list.js";
import { filterComponent } from "./components/filter/filter";

document.querySelector('#app').innerHTML = `
    ${headerTemplate}
    <div id="todo-list-container"></div>
    ${footerTemplate}
`
filterComponent();
footerComponent();
attachTodoListEventDelegator();
todoStore.loadTodos(fetchTodos());
