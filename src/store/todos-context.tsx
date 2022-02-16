import React, { useState } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
  todoItems: Todo[];
  addTodo: (text: string, isHigh: boolean, isUrgent: boolean) => void;
  removeTodo: (id: string) => void;
  updateTodo: (item: Todo) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  todoItems: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
  updateTodo: (item: Todo) => {},
});

const TodosContextProvider: React.FC<{}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string, isHigh: boolean, isUrgent: boolean) => {
    const newTodo = new Todo(text, isHigh, isUrgent);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHander = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((item) => item.id !== todoId);
    });
  };

  const updateTodoHander = (todo: Todo) => {
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((item) => item.id === todo.id);

      let updatedTodos = [...prevTodos];
      updatedTodos.splice(todoIndex, 1, todo);

      return updatedTodos;
    });
  };
  const store: TodosContextObj = {
    todoItems: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHander,
    updateTodo: updateTodoHander,
  };

  return (
    <TodosContext.Provider value={store}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
