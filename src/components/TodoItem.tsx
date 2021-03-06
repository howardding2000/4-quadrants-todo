import React from "react";
import { MdDoneOutline, MdDeleteOutline } from "react-icons/md";
import Todo from "../models/todo";
// import Card from '../UI/Card';
import DndList from "../UI/DndList";
import classes from "./TodoItem.module.scss";

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

  const badgeColor: string = (() => {
    if (props.item.isHigh && props.item.isUrgent) {
      return `${classes["is-h-u"]}`;
    }
    if (!props.item.isHigh && props.item.isUrgent) {
      return `${classes["is-nh-u"]}`;
    }
    if (props.item.isHigh && !props.item.isUrgent) {
      return `${classes["is-h-nu"]}`;
    }
    if (!props.item.isHigh && !props.item.isUrgent) {
      return `${classes["is-nh-nu"]}`;
    }
    return "";
  })();

  return (
    <DndList
      id={props.item.id}
      onDrapItem={props.onDragTodo}
      onDropTodo={props.onDropTodo}
    >
      <div
        className={`${classes.item} ${
          props.item.isCompleted
            ? classes["is-completed"]
            : classes[`is-not-completed`]
        }`}
      >
        <div className={`${classes.badge} ${badgeColor}`}></div>
        <div className={classes.text} onClick={completeTodoHandler}>
          {props.item.text}
        </div>
        <section>
          <div className={classes.status}>
            {/* {props.item.isCompleted ? (
              <MdDoneOutline />
            ) : ( */}
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
            {/* )} */}
          </div>
          <div className={classes.remove} onClick={removeTodo}>
            <div>
              <MdDeleteOutline className={classes["remove-icon"]} />
            </div>
          </div>
        </section>
      </div>
    </DndList>
  );
};

export default React.memo(TodoItem);
