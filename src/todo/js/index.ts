import getTodos from './getTodos.js';
import registry from './registry.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import todosView from './view/todos.js';

registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');

    if (main instanceof HTMLElement) {
      const newMain = registry.renderRoot(main, state);
      main.replaceWith(newMain);
    }
  });
};

window.setInterval(() => {
  state.todos = getTodos();
  render();
}, 5000);

render();
