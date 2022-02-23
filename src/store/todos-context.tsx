import React, { useState, useCallback, useEffect } from 'react';
import Todo from '../models/todo';

type TodosContextObj = {
  todoItems: Todo[];
  addTodo: (text: string, isHigh: boolean, isUrgent: boolean) => void;
  removeTodo: (id: string) => void;
  updateTodo: (item: Todo) => void;
  dropTodo: (tragetId: string) => void;
  dragTodo: (drapItem: Todo) => void;
  cleanTodos: () => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  todoItems: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
  updateTodo: (item: Todo) => {},
  dropTodo: (tragetId: string) => {},
  dragTodo: (drapItem: Todo) => {},
  cleanTodos: () => {},
});

let dragTodo: Todo;

const TodosContextProvider: React.FC<{}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const reference = localStorage.getItem('todos');
    if (reference) {
      const updatedTodos = JSON.parse(reference);

      setTodos(updatedTodos);
      console.log('updatedTodos');
      console.log(updatedTodos);
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
    console.log('updateTodoHandler');
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((item) => item.id === todo.id);
      let todos = [...prevTodos];
      todos.splice(todoIndex, 1, todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    });
  }, []);

  const dragTodoHandler = (item: Todo) => {
    if (dragTodo?.id !== item.id) {
      dragTodo = item;
      console.log('dragTodoHandler');
      console.log(todos);
    }
  };

  const dropTodoHandler = (tragetId: string) => {

    if (dragTodo && dragTodo.id !== tragetId) {

      setTodos((prevTodos) => {
        const drapIndex = prevTodos.findIndex(
          (item) => item.id === dragTodo.id
        );
        const updatedTodos = [
          ...prevTodos.filter((item) => item.id !== dragTodo.id),
        ];

        const tragetIndex = updatedTodos.findIndex(
          (item) => item.id === tragetId
        );
        if(drapIndex>tragetIndex){          
          updatedTodos.splice(tragetIndex, 0, dragTodo);
          updatedTodos[tragetIndex].isCompleted = updatedTodos[tragetIndex+1].isCompleted
        }

        if(drapIndex<=tragetIndex){
          updatedTodos.splice(tragetIndex+1, 0, dragTodo);
          updatedTodos[tragetIndex+1].isCompleted = updatedTodos[tragetIndex].isCompleted

        }
        console.log(updatedTodos);

 
        return updatedTodos;
      });
      //   dragTodo = undefined;
    }
  };

  const cleanTodosHandler = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };
  const store: TodosContextObj = {
    todoItems: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    updateTodo: updateTodoHandler,
    dropTodo: dropTodoHandler,
    dragTodo: dragTodoHandler,
    cleanTodos: cleanTodosHandler,
  };

  return (
    <TodosContext.Provider value={store}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
