import React, { useState, useCallback, useEffect,useRef } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  todoItems: Todo[];
  addTodo: (text: string, isHigh: boolean, isUrgent: boolean) => void;
  removeTodo: (id: string) => void;
  updateTodo: (item: Todo) => void;
  dropTodo: (tragetId: string) => void;
  dragTodo: (drapId: string) => void;
  cleanTodos: () => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  todoItems: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
  updateTodo: (item: Todo) => {},
  dropTodo: (tragetId: string) => {},
  dragTodo: (drapId: string) => {},
  cleanTodos: () => {},
});

const TodosContextProvider: React.FC<{}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const drapIdRef = useRef('');

  useEffect(() => {
    //get todolist from local storage
    console.log('todos updated?')
    const reference = localStorage.getItem("todos");

    if (reference) {
      const LocalTodos = JSON.parse(reference);
      setTodos(LocalTodos);
    }
  }, []);

  const addTodoHandler = (text: string, isHigh: boolean, isUrgent: boolean) => {
    const newTodo = new Todo(text, isHigh, isUrgent);

    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.concat(newTodo);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const removeTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((item) => item.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }, []);

  const updateTodoHandler = useCallback((todo: Todo) => {
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((item) => item.id === todo.id);
      const updatedTodos = [...prevTodos].splice(todoIndex, 1, todo);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }, []);

  const dragTodoHandler = (id: string) => {
  
    if (drapIdRef.current === id) {
      return;
    }
    // store drag id
    drapIdRef.current = id;
  };

  const dropTodoHandler = (tragetId: string) => {
      const drapId = drapIdRef.current;
      if (drapId === tragetId) {
        return;
      }
      
      setTodos((prevTodos) => {
        // rearrange the order of todolist
        const drapIndex = prevTodos.findIndex((item) => item.id === drapId);

        // get dragTodo by id
        const dragTodo = prevTodos[drapIndex];

        // remove dragTodo from todolist
        const updatedTodos = [
          ...prevTodos.filter((item) => item.id !== drapId),
        ];
        const tragetIndex = updatedTodos.findIndex(
          (item) => item.id === tragetId
        );

        // replace dragTodo into todolist
        // If drap from the topside of the traget
        if (drapIndex > tragetIndex) {
          updatedTodos.splice(tragetIndex, 0, dragTodo);
          updatedTodos[tragetIndex].isCompleted =
            updatedTodos[tragetIndex + 1].isCompleted;
        }

        // If drap from the downside of the traget
        if (drapIndex <= tragetIndex) {
          updatedTodos.splice(tragetIndex + 1, 0, dragTodo);
          updatedTodos[tragetIndex + 1].isCompleted =
            updatedTodos[tragetIndex].isCompleted;
        }
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }

  const cleanTodosHandler = () => {
    setTodos([]);
    localStorage.removeItem("todos");
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
