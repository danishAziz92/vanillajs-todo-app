import { todoStore } from '../todo-list/todo-list';
import './filter-styles.css'

export const filterTemplate= `
    <div class="filter-container">
        <select id="filter-dropdown">
            <option disabled selected value="default"> -- select an option -- </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        </select>
        <button id="clear-filter-button">Clear</button>
    </div>
`;

export function filterComponent() {
    todoStore.subscribe("all-todos-tasks", clearFilters);

    document.getElementById("filter-dropdown").addEventListener("change", handleFilterChange);
    document.getElementById("clear-filter-button").addEventListener("click", handleClearFilter);

    function handleFilterChange(e) {
        e.preventDefault();
        console.log("filter selected", e.target.value);
        todoStore.filterList(e.target.value);
    }

    function handleClearFilter(e) {
        todoStore.loadTodos();
    }

    function clearFilters(){
        document.getElementById("filter-dropdown").value = "default";
    }
}