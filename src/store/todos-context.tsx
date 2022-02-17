import React, { useState, useCallback, useEffect } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
  todoItems: Todo[];
  addTodo: (text: string, isHigh: boolean, isUrgent: boolean) => void;
  removeTodo: (id: string) => void;
  updateTodo: (item: Todo) => void;
  cleanTodos: () => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  todoItems: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
  updateTodo: (item: Todo) => {},
  cleanTodos: () => {},
});

const TodosContextProvider: React.FC<{}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const reference = localStorage.getItem('todos');
    if (reference) {
      const todos = JSON.parse(reference);
      setTodos(todos);
    }
  }, []);

  const addTodoHandler = (text: string, isHigh: boolean, isUrgent: boolean) => {
    const newTodo = new Todo(text, isHigh, isUrgent);

    setTodos((prevTodos) => {
      const todos = prevTodos.concat(newTodo);
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    });
  };

  const removeTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      const todos = prevTodos.filter((item) => item.id !== todoId);
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    });
  }, []);

  const updateTodoHandler = useCallback((todo: Todo) => {
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((item) => item.id === todo.id);
      let todos = [...prevTodos];
      todos.splice(todoIndex, 1, todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    });
  }, []);

  const cleanTodosHandler = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };
  const store: TodosContextObj = {
    todoItems: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
    cleanTodos: cleanTodosHandler,
  };

  return (
    <TodosContext.Provider value={store}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
