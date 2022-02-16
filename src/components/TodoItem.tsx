import React, { useContext, useState } from 'react';
import Todo from '../models/todo';
import { TodosContext } from '../store/todos-context';
import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ item: Todo }> = ({ item }) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const todosCxt = useContext(TodosContext);

  const onCompleteTodoHandler = (event: React.MouseEvent) => {
    todosCxt.updateTodo({ ...item, isCompleted: !item.isCompleted });
  };

  const mouseEnterHandler = (event: React.MouseEvent) => {
    setMouseEnter(true);
  };
  const mouseOutHandler = (event: React.MouseEvent) => {
    setMouseEnter(false);
  };
  return (
    <li
      className={`${classes.list} ${
        item.isCompleted
          ? classes.completed
          : mouseEnter
          ? classes.mouseEnter
          : ''
      }
      }  `}
      onMouseEnter={mouseEnterHandler}
      onMouseOut={mouseOutHandler}
      onClick={onCompleteTodoHandler}
    >
      <div>{item.text}</div>
      <section>
        <div>{item.isHigh ? 'High' : 'Not High'}</div>
        <div>{item.isUrgent ? 'Urget' : 'Not Urgent'}</div>
      </section>
    </li>
  );
};

export default TodoItem;
