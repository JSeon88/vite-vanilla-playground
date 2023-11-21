export type Todo = {
  text: string;
  completed: boolean;
};

export type State = {
  todos: Todo[];
  currentFilter: string;
};

export type Registry = {
  [key: string]: (targetElement: HTMLElement, state: State, events: Events) => HTMLElement;
};

export type Component = {
  (targetElement: HTMLElement, state: State, events: Events): HTMLElement;
};

export type Events = {
  deleteItem: (index: number) => void;
  addItem: (text: string) => void;
};
