import { faker } from '@faker-js/faker';

import { Todo } from '../type/todo';

const createElement = () => ({
  text: faker.string.sample(5),
  completed: faker.datatype.boolean(),
});

const repeat = (elementFactory: () => Todo, num: number) => {
  const array = [];
  for (let index = 0; index < num; index++) {
    array.push(elementFactory());
  }
  return array;
};

export default () => {
  const howMany = faker.number.int(3);
  return repeat(createElement, howMany);
};
