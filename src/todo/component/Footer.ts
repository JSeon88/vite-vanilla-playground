import { Todo } from '../type/todo';

const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left';
  }

  return `${length} Items left`;
};

export default class Footer extends HTMLElement {
  static get observedAttributes() {
    return ['filter', 'todos'];
  }

  get todos() {
    if (!this.hasAttribute('todos')) {
      return [];
    }

    return JSON.parse(this.getAttribute('todos') as string);
  }

  set todos(value) {
    this.setAttribute('todos', JSON.stringify(value));
  }

  get filter() {
    return this.getAttribute('filter');
  }

  set filter(value) {
    this.setAttribute('filter', String(value));
  }

  connectedCallback() {
    const template = document.getElementById('footer') as HTMLTemplateElement;

    const content = template.content.firstElementChild?.cloneNode(true) as HTMLTemplateElement;

    this.appendChild(content);

    const { filter, todos } = this;

    this.querySelectorAll('li a').forEach((a) => {
      if (a.textContent === filter) {
        a.classList.add('selected');
      } else {
        a.classList.remove('selected');
      }
    });

    const label = getTodoCount(todos);

    (this.querySelector('span.todo-count') as HTMLSpanElement).textContent = label;
  }
}
