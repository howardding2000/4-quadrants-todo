// import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from '../dnd/ItemTypes';
import classes from './DndCard.module.css';

const DndCard: React.FC = (props) => {

  const [{isDragging}, drag] = useDrag(()=>({
    type: ItemType.TODO,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={classes.dnd}
      ref={drag}
      style={{
        opacity: isDragging? 0.5:1,
      }}
    >
      {props.children}
    </div>
  );
};

export default DndCard;
