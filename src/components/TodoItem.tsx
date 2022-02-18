import React from 'react';
import Todo from '../models/todo';
import DndCard from '../UI/DndCard';
import classes from './TodoItem.module.css';

const TodoItem: React.FC<{
  item: Todo;
  onUpdateTodo: (item: Todo) => void;
  onRemoveTodo: (todoid: string) => void;
}> = (props) => {

  // task handlers
  const completeTodoHandler = (event: React.MouseEvent) => {
    props.onUpdateTodo({ ...props.item, isCompleted: !props.item.isCompleted });
  };
  const changeHighHandler = (event: React.MouseEvent) => {
    props.onUpdateTodo({ ...props.item, isHigh: !props.item.isHigh });
  };
  const changeUrgentHandler = (event: React.MouseEvent) => {
    props.onUpdateTodo({ ...props.item, isUrgent: !props.item.isUrgent });
  };
  const removeTodo = (event: React.MouseEvent) => {
    props.onRemoveTodo(props.item.id);
  };

 

  return (
    <DndCard>
    <li
      className={props.item.isCompleted ? classes.completed : classes.list}
      draggable='true'
    >
      <div className={classes.text} onClick={completeTodoHandler}>
        {props.item.text}
      </div>
      <section>
        <div onClick={changeHighHandler}>{props.item.isHigh ? 'H' : 'NH'}</div>
        <div onClick={changeUrgentHandler}>
          {props.item.isUrgent ? 'U' : 'NU'}
        </div>
        <div onClick={removeTodo}>Remove</div>
      </section>
    </li>
    </DndCard>
  );
};

export default React.memo(TodoItem);
