import { Component, Registry, State } from '../type/todo';

const registry: Registry = {};

const renderWrapper = (component: Component) => {
  return (targetElement: HTMLElement, state: State) => {
    const element = component(targetElement, state);

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

        target.replaceWith(child(target, state));
      }
    });
    return element;
  };
};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

// 최초 DOM 요소에서 렌더링을 시작
const renderRoot = (root: HTMLElement, state: State) => {
  const cloneComponent = (root: HTMLElement): HTMLElement => {
    return root.cloneNode(true) as HTMLElement;
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
};
