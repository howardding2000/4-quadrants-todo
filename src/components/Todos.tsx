import React, { useContext } from 'react';
import { TodosContext } from '../store/todos-context';
import TodoItem from './TodoItem';

import classes from './Todos.module.css';

const Todo: React.FC = () => {
  const todoCxt = useContext(TodosContext);
  const activeTodoList = todoCxt.todoItems.filter((item) => !item.isCompleted);
  const completedTodoList = todoCxt.todoItems.filter(
    (item) => item.isCompleted
  );
  return (
    <ul className={classes.todos}>
      {activeTodoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
      {completedTodoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Todo;
