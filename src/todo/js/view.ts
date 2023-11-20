import { State, Todo } from '../type/todo';

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

const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter((todo) => !todo.completed);
  const { length } = notCompleted;
  if (length === 1) {
    return '1 Item left';
  }

  return `${length} items left`;
};

export default (targetElement: HTMLElement, state: State) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true);
  if (element instanceof HTMLElement) {
    const list = element.querySelector('.todo-list');
    const counter = element.querySelector('.todo-count');
    const filters = element.querySelector('.filters');

    if (list && counter && filters) {
      list.innerHTML = todos.map(getTodoElement).join('');
      counter.textContent = getTodoCount(todos);

      Array.from(filters.querySelectorAll('li a')).forEach((a) => {
        if (a.textContent === currentFilter) {
          a.classList.add('selected');
        } else {
          a.classList.remove('selected');
        }
      });
    }
  }

  return element;
};
