import React, { useContext } from 'react';
import { TodosContext } from '../store/todos-context';
import TodoItem from './TodoItem';

import classes from './Todos.module.css';

const Todo: React.FC = () => {
  const todoCxt = useContext(TodosContext);

  return (
    <ul className={classes.itemslist}>
      {todoCxt.todoItems.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Todo;
