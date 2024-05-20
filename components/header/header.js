import './header-styles.css'
import { filterTemplate, filterComponent } from "../filter/filter";

const userName = "Dan";
export const headerTemplate = `
<div class="header-container">
    <h1>todo app - ${userName}</h1>
    ${filterTemplate}
</div>
`

export function headerComponent() {
    filterComponent();
}
