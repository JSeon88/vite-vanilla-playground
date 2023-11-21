import { Component, Events, Registry, State } from '../type/todo';

const registry: Registry = {};

const renderWrapper = (component: Component) => {
  return (targetElement: HTMLElement, state: State, events: Events) => {
    const element = component(targetElement, state, events);

    const childComponents = element.querySelectorAll('[data-component]');

    Array.from(childComponents).forEach((target) => {
      if (target instanceof HTMLElement) {
        const name = target.dataset.component;

        if (!name) {
          return;
        }
        const child = registry[name];
        if (!child) {
          return;
        }

        target.replaceWith(child(target, state, events));
      }
    });
    return element;
  };
};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

// 최초 DOM 요소에서 렌더링을 시작
const renderRoot = (root: HTMLElement, state: State, events: Events) => {
  const cloneComponent = (root: HTMLElement): HTMLElement => {
    return root.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};
