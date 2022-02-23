// import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../dnd/ItemTypes';
import classes from './DndCard.module.css';

const DndCard: React.FC<{ id: string; onDrapItem: (id: string) => void }> = (
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
      props.onDrapItem(props.id);
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
