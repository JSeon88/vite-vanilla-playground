export type Todo = {
  text: string;
  completed: boolean;
};

export type State = {
  todos: Todo[];
  currentFilter: string;
};
