import React, { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodosContext } from "../store/todos-context";
import Button from "../UI/Button";
import TodoItem from "./TodoItem";
import Todo from "../models/todo";

import classes from "./Todos.module.scss";

const Todos: React.FC = () => {
  const { todoItems, updateTodo, removeTodo, dragTodo, dropTodo, cleanTodos } =
    useContext(TodosContext);

  const sortTodos = (a: Todo, b: Todo): number => {
    const getStateWeight = (todo: Todo): number => {
      if (todo.isHigh && todo.isUrgent) return 4;
      if (todo.isHigh && !todo.isUrgent) return 3;
      if (!todo.isHigh && todo.isUrgent) return 2;
      return 1;
    };
    return getStateWeight(b) - getStateWeight(a);
  };

  const activeTodoList = todoItems.filter((item) => !item.isCompleted).sort(sortTodos);
  const completedTodoList = todoItems.filter((item) => item.isCompleted);

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

export default Todos;
