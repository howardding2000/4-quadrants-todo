import React, { useContext } from 'react';
import { TodosContext } from '../store/todos-context';
import Button from '../UI/Button';
import TodoItem from './TodoItem';

import classes from './Todos.module.css';

const Todo: React.FC = () => {
  const todosCxt = useContext(TodosContext);
  const updateTodo = todosCxt.updateTodo;
  const removeTodo = todosCxt.removeTodo;
  const cleanTodos = todosCxt.cleanTodos;
  const activeTodoList = todosCxt.todoItems.filter((item) => !item.isCompleted);
  const completedTodoList = todosCxt.todoItems.filter(
    (item) => item.isCompleted
  );

  return (
    <>
      <ul className={classes.todos}>
        {activeTodoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onUpdateTodo={updateTodo}
            onRemoveTodo={removeTodo}
          />
        ))}
        {completedTodoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onUpdateTodo={updateTodo}
            onRemoveTodo={removeTodo}
          />
        ))}
      </ul>
      <Button onClick={cleanTodos}>Clean Todos</Button>
    </>
  );
};

export default Todo;
