import { Events, State, Todo } from '../../type/todo';

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = <HTMLTemplateElement>document.querySelector('#todo-item');
  }

  return template.content.firstElementChild?.cloneNode(true);
};

const getTodoElement = (todo: Todo, index: number) => {
  const { text, completed } = todo;

  const element = createNewTodoNode() as HTMLElement;

  (element.querySelector('input.edit') as HTMLInputElement).value = text;
  (element.querySelector('label') as HTMLLabelElement).textContent = text;

  if (completed) {
    element.classList.add('completed');

    (element.querySelector('input.toggle') as HTMLInputElement).checked = true;
  }

  const destroyEl = element.querySelector('button.destroy') as HTMLButtonElement;
  destroyEl.dataset.index = String(index);
  return element;
};

export default (targetElement: HTMLElement, { todos }: State, events: Events) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;

  newTodoList.innerHTML = '';

  todos
    .map((todo, index) => getTodoElement(todo, index))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  newTodoList.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLButtonElement && target.matches('button.destroy')) {
      events.deleteItem(Number(target.dataset.index));
    }
  });

  return newTodoList;
};
