import React, { useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TodosContext } from '../store/todos-context';
import Button from '../UI/Button';
import TodoItem from './TodoItem';

import classes from './Todos.module.scss';

const Todo: React.FC = () => {
  const {todoItems,updateTodo,removeTodo,dragTodo,dropTodo,cleanTodos} = useContext(TodosContext);
  // const updateTodo = todosCxt.updateTodo;
  // const removeTodo = todosCxt.removeTodo;
  // const dragTodo = todosCxt.dragTodo;
  // const dropTodo = todosCxt.dropTodo;
  // const cleanTodos = todosCxt.cleanTodos;
  const activeTodoList = todoItems.filter((item) => !item.isCompleted);
  const completedTodoList = todoItems.filter(
    (item) => item.isCompleted
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <ul className={classes.todos}>
        {activeTodoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onUpdateTodo={updateTodo}
            onRemoveTodo={removeTodo}
            onDragTodo={dragTodo}
            onDropTodo={dropTodo}

          />
        ))}

        {completedTodoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onUpdateTodo={updateTodo}
            onRemoveTodo={removeTodo}
            onDragTodo={dragTodo}
            onDropTodo={dropTodo}
          />
        ))}
      </ul>
      <Button onClick={cleanTodos}>Clean Todos</Button>
    </DndProvider>
  );
};

export default Todo;
