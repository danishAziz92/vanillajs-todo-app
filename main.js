import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { headerTemplate, headerComponent } from './components/header/header.js'
import { footerTemplate, footerComponent } from './components/footer/footer.js'
import { attachTodoListEventDelegator, todoStore, fetchTodos } from "./components/todo-list/todo-list.js";

document.querySelector('#app').innerHTML = `
    ${headerTemplate}
    <div id="todo-list-container"></div>
    ${footerTemplate}
`
headerComponent();
footerComponent();
attachTodoListEventDelegator();
todoStore.loadTodos(fetchTodos());
