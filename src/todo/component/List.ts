import { Todo } from '../type/todo';

export const EVENTS = {
  DELETE_ITEM: 'DELETE_ITEM',
};

export class List extends HTMLElement {
  constructor(private list: HTMLElement, private itemTemplate: HTMLTemplateElement) {
    super();
  }
  static get observedAttributes() {
    return ['todos'];
  }

  get todos() {
    if (!this.hasAttribute('todos')) {
      return [];
    }
    const todos = this.getAttribute('todos');
    if (!todos) {
      return [];
    }
    return JSON.parse(todos);
  }

  set todos(value) {
    this.setAttribute('todos', JSON.stringify(value));
  }

  onDeleteClick(index: string) {
    const event = new CustomEvent(EVENTS.DELETE_ITEM, {
      detail: {
        index,
      },
    });

    this.dispatchEvent(event);
  }

  createNewTodoNode() {
    return this.itemTemplate.content.firstElementChild?.cloneNode(true) as HTMLTemplateElement;
  }

  getTodoElement(todo: Todo, index: number) {
    const { text, completed } = todo;

    const element = this.createNewTodoNode();

    (element.querySelector('input.edit') as HTMLInputElement).value = text;
    (element.querySelector('label') as HTMLLabelElement).textContent = text;

    if (completed) {
      element.classList.add('completed');
      (element.querySelector('input.toggle') as HTMLInputElement).checked = true;
    }

    (element.querySelector('button.destroy') as HTMLButtonElement).dataset.index = String(index);

    return element;
  }

  updateList() {
    this.list.innerHTML = '';
    this.todos.forEach((todo: Todo, index: number) => {
      const element = this.getTodoElement(todo, index);
      this.list.appendChild(element);
    });
  }

  connectedCallback() {
    this.innerHTML = '<ul class="todo-list"></ul>';

    this.itemTemplate = document.querySelector('#todo-item') as HTMLTemplateElement;

    this.list = this.querySelector('ul') as HTMLElement;

    this.list.addEventListener('click', (e: Event) => {
      const target = e.target;
      if (target instanceof HTMLButtonElement && target.matches('button.destroy')) {
        this.onDeleteClick(target.dataset.index as string);
      }
    });

    this.updateList();
  }

  attributeChangedCallback() {
    this.updateList();
  }
}
