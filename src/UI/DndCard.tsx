// import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import Todo from '../models/todo';
import classes from './DndCard.module.css';

const DndCard: React.FC<{ item: Todo; onDrapItem: (item: Todo) => void }> = (
  props
) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      props.onDrapItem(props.item);
    }
  }, [isDragging, props]);

  return (
    <div
      className={classes.dnd}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        // display: isDragging? 'none': 'block',
      }}
    >
      {props.children}
    </div>
  );
};

export default DndCard;
