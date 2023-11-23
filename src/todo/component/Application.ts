import { State } from '../type/todo.js';
import Footer from './Footer.js';
import { EVENTS, List } from './List.js';

export default class App extends HTMLElement {
  constructor(private state: State, private template: HTMLTemplateElement, private list: List, private footer: Footer) {
    super();
    this.state = {
      todos: [],
      currentFilter: 'All',
    };

    this.template = document.getElementById('todo-app') as HTMLTemplateElement;
  }

  deleteItem(index: number) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  addItem(text: string) {
    this.state.todos.push({
      text,
      completed: false,
    });
    this.syncAttributes();
  }

  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.currentFilter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild?.cloneNode(true) as HTMLTemplateElement;

      this.appendChild(content);

      (this.querySelector('.new-todo') as HTMLElement).addEventListener('keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const target = e.target;
          if (target instanceof HTMLInputElement) {
            this.addItem(target.value);
            target.value = '';
          }
        }
      });

      this.footer = this.querySelector('todomvc-footer') as Footer;

      this.list = this.querySelector('todomvc-list') as List;
      this.list.addEventListener(EVENTS.DELETE_ITEM, (e: Event) => {
        if (e instanceof CustomEvent) {
          this.deleteItem(e.detail.index as number);
        }
      });

      this.syncAttributes();
    });
  }
}
