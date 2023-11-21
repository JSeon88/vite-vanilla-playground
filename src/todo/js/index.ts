import { State } from '../type/todo.js';
import applyDiff from './applyDiff.js';
import registry from './registry.js';
import appView from './view/app.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import todosView from './view/todos.js';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state: State = {
  todos: [],
  currentFilter: 'All',
};

const events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false,
    });
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    if (main instanceof HTMLElement) {
      const newMain = registry.renderRoot(main, state, events);
      // 실제 노드와 가상 노드를 비교하여 반영.
      applyDiff(document.body, main, newMain);
    }
  });
};

render();
