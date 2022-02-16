import React, { useState } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
  todoItems: Todo[];
  addTodo: (text: string, isHigh: boolean, isUrgent: boolean) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  todoItems: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
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
    setTodos((prevTodos)=>{
        return prevTodos.filter((item) => item.id !== todoId);
    })

  };
  const store: TodosContextObj = {
    todoItems: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHander,
  };

  return (
    <TodosContext.Provider value={store}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;