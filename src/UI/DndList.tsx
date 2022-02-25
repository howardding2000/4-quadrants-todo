import React, { useEffect } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../dnd/ItemTypes";
import classes from "./DndList.module.css";

const DndList: React.FC<{
  id: string;
  onDrapItem: (id: string) => void;
  onDropTodo: (id: string) => void;
}> = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TODO,
      drop: () => props.onDropTodo(props.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    if (isDragging) {
      props.onDrapItem(props.id);
    }
  }, [isDragging, isOver, props]);

  return (
    <li
      className={classes.dnd}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        // display: isDragging? 'none': 'block',
      }}
    >
      <div ref={drop} style={isOver ? { outline: "3px solid lightgray", borderRadius: '5px' } : {}}>
        {props.children}
      </div>
    </li>
  );
};

export default DndList;
