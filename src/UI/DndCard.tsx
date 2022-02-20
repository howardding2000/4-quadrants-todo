// import React, { useState } from 'react';
import classes from './DndCard.module.css';

const DndCard: React.FC = (props) => {
  // const [showStyle, setShowStyle] = useState({});

  // // Darp and Drop handlers
  // const dragStartHandler = (event: React.DragEvent) => {};

  // const dragEndHandler = (event: React.DragEvent) => {};
  // const dragEnterHandler = (event: React.DragEvent) => {};
  // const dragLeaveHandler = (event: React.DragEvent) => {};
  // const dragOverHandler = (event: React.DragEvent) => {};

  return (
    <div
      className={classes.dnd}
      draggable='true'
      // style={showStyle}
      // onDragStart={dragStartHandler}
      // onDragEnd={dragEndHandler}
      // onDragEnter={dragEnterHandler}
      // onDragLeave={dragLeaveHandler}
      // onDragOver={dragOverHandler}
    >
      {props.children}
    </div>
  );
};

export default DndCard;
