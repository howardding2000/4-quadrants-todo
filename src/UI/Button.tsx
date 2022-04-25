import React from 'react';
import classes from './Button.module.scss';

const Button: React.FC<{ onClick?: (event: React.MouseEvent) => void }> = (
  props
) => {
  return (
    <button className={classes.button} onClick={props.onClick} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
