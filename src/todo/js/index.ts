import applyDiff from './applyDiff.js';
import getTodos from './getTodos.js';
import registry from './registry.js';
import appView from './view/app.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import todosView from './view/todos.js';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    if (main instanceof HTMLElement) {
      const newMain = registry.renderRoot(main, state);
      // 실제 노드와 가상 노드를 비교하여 반영.
      applyDiff(document.body, main, newMain);
    }
  });
};

render();
