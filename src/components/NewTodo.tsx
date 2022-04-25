import React, { useRef, useContext } from 'react';
import { TodosContext } from '../store/todos-context';
import Button from '../UI/Button';

import classes from './NewTodo.module.scss';

const NewTodo: React.FC = () => {
  const textRef = useRef<HTMLInputElement>(null);
  const isHighRef = useRef<HTMLInputElement>(null);
  const isUrgentRef = useRef<HTMLInputElement>(null);
  const todosCxt = useContext(TodosContext);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = textRef.current!.value;

    if (enteredText.trim().length !== 0) {
      todosCxt.addTodo(
        textRef.current!.value,
        isHighRef.current!.checked,
        isUrgentRef.current!.checked
      );
      textRef.current!.value = '';
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input type='text' ref={textRef} placeholder='Add new to do...' />
      <div className={classes.setup}>
        <div className={classes.status}>
          <input
            type='checkbox'
            id='isHigh'
            defaultChecked
            value='isHigh'
            ref={isHighRef}
          />
          <label htmlFor='isHigh'>Is High</label>
          <input
            type='checkbox'
            id='isUrgent'
            value='isUrgent'
            defaultChecked
            ref={isUrgentRef}
          />
          <label htmlFor='isUrgent'>Is Urgent</label>
        </div>
        <Button>Add</Button>
      </div>
    </form>
  );
};

export default NewTodo;
