import { Events, State } from '../../type/todo';

let template: HTMLTemplateElement;

const createAppElement = () => {
  if (!template) {
    template = <HTMLTemplateElement>document.querySelector('#todo-app');
  }

  return (template.content.firstElementChild as HTMLElement).cloneNode(true);
};

const addEvents = (targetElement: HTMLElement, events: Events) => {
  (targetElement.querySelector('.new-todo') as HTMLElement).addEventListener('keypress', (e) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && e.key === 'Enter') {
      events.addItem(target.value);
      target.value = '';
    }
  });
};

export default (targetElement: HTMLElement, _state: State, events: Events) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  if (newApp instanceof HTMLElement) {
    newApp.innerHTML = '';
    newApp.appendChild(createAppElement());

    addEvents(newApp, events);
  }

  return newApp;
};
