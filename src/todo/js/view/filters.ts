import { State } from '../../type/todo';

export default (targetElement: HTMLElement, { currentFilter }: State): HTMLElement => {
  const newCounter = targetElement.cloneNode(true) as HTMLElement;

  [...newCounter.querySelectorAll('li a')].forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });
  return newCounter;
};
