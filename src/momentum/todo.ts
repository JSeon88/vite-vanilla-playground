const todoFormEl = document.querySelector('#uid_todo_form');
const todoInputEl = todoFormEl?.querySelector('input');
const ulEl = document.querySelector('ul');

type Todo = {
  id: string;
  todo: string;
};

let todos: Todo[] = [];

const handleSaveTodo = (event: Event) => {
  event.preventDefault();

  if (todoInputEl) {
    const uuid = crypto.randomUUID();
    const newTodo = {
      id: uuid,
      todo: todoInputEl.value,
    };
    todos.push(newTodo);
    drawTodo(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    todoInputEl.value = '';
  }
};

const drawTodo = (newTodo: Todo) => {
  const liEl = document.createElement('li');
  liEl.dataset.id = newTodo.id;
  liEl.innerHTML = `${newTodo.todo} <button>X</button>`;
  ulEl?.appendChild(liEl);
};

const handleDelTodo = (event: MouseEvent) => {
  event.preventDefault();
  const target = event.target;
  if (target instanceof HTMLButtonElement) {
    const parentElement = target.parentElement;

    if (parentElement) {
      const delID = parentElement.dataset.id;

      parentElement.remove();
      localStorage.setItem('todos', JSON.stringify(todos.filter((todo) => todo.id !== delID)));
    }
  }
};

export const todoInit = () => {
  todoFormEl?.addEventListener('submit', handleSaveTodo);
  ulEl?.addEventListener('click', handleDelTodo);

  const localStorageTodos = localStorage.getItem('todos');
  if (localStorageTodos) {
    todos = JSON.parse(localStorageTodos);
    todos.forEach((todo: Todo) => drawTodo(todo));
  }
};
