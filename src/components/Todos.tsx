import React, { useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodosContext } from "../store/todos-context";
import Button from "../UI/Button";
import TodoItem from "./TodoItem";
import Todo from "../models/todo";

import classes from "./Todos.module.scss";
import Modal from "../UI/Modal";

const Todos: React.FC = () => {
  const { todoItems, updateTodo, removeTodo, dragTodo, dropTodo, cleanTodos } =
    useContext(TodosContext);

  const [isShowModal, setIsShowModal] = useState(false);

  const sortTodos = (a: Todo, b: Todo): number => {
    const getStateWeight = (todo: Todo): number => {
      if (todo.isHigh && todo.isUrgent) return 4;
      if (todo.isHigh && !todo.isUrgent) return 3;
      if (!todo.isHigh && todo.isUrgent) return 2;
      return 1;
    };
    return getStateWeight(b) - getStateWeight(a);
  };

  const confirmCleanTodos = () => {
    setIsShowModal(false);
    cleanTodos();
  };

  const activeTodoList = todoItems
    .filter((item) => !item.isCompleted)
    .sort(sortTodos);

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
      <Button onClick={() => setIsShowModal(true)}>Clean Todos</Button>
      {isShowModal && (
        <Modal
          onConfirm={confirmCleanTodos}
          onCancel={() => setIsShowModal(false)}
        >
          Are you sure you want to delete all todos?
        </Modal>
      )}
    </DndProvider>
  );
};

export default Todos;
