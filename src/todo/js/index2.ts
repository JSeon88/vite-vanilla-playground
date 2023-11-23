import Application from '../component/Application.ts';
import Footer from '../component/Footer.ts';
import { List } from '../component/List.ts';

window.customElements.define('todomvc-app', Application);
window.customElements.define('todomvc-footer', Footer);
window.customElements.define('todomvc-list', List);
