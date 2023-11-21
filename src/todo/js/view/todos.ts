import { State, Todo } from '../../type/todo';

const getTodoElement = ({ text, completed }: Todo) => {
  return `
    <li ${completed ? 'class="completed"' : ''}>
      <div>
        <input ${completed ? 'checked' : ''} type="checkbox" class="toggle"/>
        <label>${text}</label>
        <button class="destroy">삭제</button>
      </div>
      <input class="edit" value="${text}" />
    </li>
  `;
};

export default (targetElement: HTMLElement, { todos }: State): HTMLElement => {
  const newTodoList = targetElement.cloneNode(true) as HTMLElement;
  // if (newTodoList instanceof HTMLElement) {
  const todosElements = todos.map(getTodoElement).join('');
  newTodoList.innerHTML = todosElements;
  return newTodoList;
  // }
};
