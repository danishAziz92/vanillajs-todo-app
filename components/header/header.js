import './header-styles.css'
import { filterTemplate } from "../filter/filter";

const userName = "Dan";
export const headerTemplate = `
<div class="header-container">
    <h1>todo - ${userName}</h1>
    ${filterTemplate}
</div>
`