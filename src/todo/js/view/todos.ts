import { State, Todo } from '../../type/todo';

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = <HTMLTemplateElement>document.querySelector('#todo-item');
  }

  return template.content.firstElementChild?.cloneNode(true);
};

const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;

  const element = createNewTodoNode() as HTMLElement;

  (element.querySelector('input.edit') as HTMLInputElement).value = text;
  (element.querySelector('label') as HTMLLabelElement).textContent = text;

  if (completed) {
    element.classList.add('completed');

    (element.querySelector('input.toggle') as HTMLInputElement).checked = true;
  }

  return element;
};

export default (targetElement: HTMLElement, { todos }: State) => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;

  newTodoList.innerHTML = '';

  todos.map(getTodoElement).forEach((element) => {
    newTodoList.appendChild(element);
  });

  return newTodoList;
};
