import React from "react";
import Todo from "../models/todo";
// import Card from '../UI/Card';
import DndList from "../UI/DndList";
import classes from "./TodoItem.module.css";

const TodoItem: React.FC<{
  item: Todo;
  onUpdateTodo: (item: Todo) => void;
  onRemoveTodo: (todoid: string) => void;
  onDragTodo: (dragId: string) => void;
  onDropTodo: (tragetId: string) => void;
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
    <DndList
      id={props.item.id}
      onDrapItem={props.onDragTodo}
      onDropTodo={props.onDropTodo}
    >
      <div  className={`${classes.item} ${
          props.item.isCompleted
            ? classes["is-completed"]
            : classes[`is-not-completed`]
        }`}>
      <div className={classes.text} onClick={completeTodoHandler}>
        {props.item.text}
      </div>
      <section>
        <div className={classes.status}>
          {props.item.isCompleted ? (
            <div>DONE</div>
          ) : (
            <>
              <div className={classes["status-h"]} onClick={changeHighHandler}>
                {props.item.isHigh ? "H" : "NH"}
              </div>
              <div
                className={classes["status-u"]}
                onClick={changeUrgentHandler}
              >
                {props.item.isUrgent ? "U" : "NU"}
              </div>
            </>
          )}
        </div>
        <div className={classes.remove} onClick={removeTodo}>
          Remove
        </div>
      </section>
      </div>
    </DndList>
  );
};

export default React.memo(TodoItem);
