import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import Todo from '../models/todo';
// import Card from '../UI/Card';
import DndCard from '../UI/DndCard';
import classes from './TodoItem.module.css';

const TodoItem: React.FC<{
  item: Todo;
  onUpdateTodo: (item: Todo) => void;
  onRemoveTodo: (todoid: string) => void;
  onDragTodo: (dragItem: Todo)=> void;
  onDropTodo: (tragetId: string)=> void;
}> = (props) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TODO,
      drop: () => props.onDropTodo(props.item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

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
    <DndCard item={props.item} onDrapItem={props.onDragTodo}>
      <li
        ref={drop}
        style={isOver ? {outline: '3px solid lightgray'} : {}}
        className={
          props.item.isCompleted
            ? classes['is-completed']
            : classes[`is-not-completed`]
        }
      > 
        <div className={classes.text} onClick={completeTodoHandler}>
          {props.item.text}
        </div>
        <section>
          <div className={classes.status}>
            {props.item.isCompleted ? (
              <div>DONE</div>
            ) : (
              <>
                <div
                  className={classes['status-h']}
                  onClick={changeHighHandler}
                >
                  {props.item.isHigh ? 'H' : 'NH'}
                </div>
                <div
                  className={classes['status-u']}
                  onClick={changeUrgentHandler}
                >
                  {props.item.isUrgent ? 'U' : 'NU'}
                </div>
              </>
            )}
          </div>
          <div className={classes.remove} onClick={removeTodo}>
            Remove
          </div>
        </section>
      </li>
    </DndCard>
  );
};

export default React.memo(TodoItem);
