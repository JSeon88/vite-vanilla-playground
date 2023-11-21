let template: HTMLTemplateElement;

const createAppElement = () => {
  if (!template) {
    template = <HTMLTemplateElement>document.querySelector('#todo-app');
  }

  return (template.content.firstElementChild as HTMLElement).cloneNode(true);
};

export default (targetElement: HTMLElement) => {
  const newApp = targetElement.cloneNode(true) as HTMLElement;
  if (newApp instanceof HTMLElement) {
    newApp.innerHTML = '';
    newApp.appendChild(createAppElement());
  }

  return newApp;
};
