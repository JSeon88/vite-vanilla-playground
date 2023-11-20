import { State } from '../type/todo';
import getTodos from './getTodos';
import view from './view';

const state: State = {
  todos: getTodos(),
  currentFilter: 'All',
};

const main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
  if (main instanceof HTMLElement) {
    const newMain = view(main, state);
    main.replaceWith(newMain);
  }
});
