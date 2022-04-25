import React, { useState, useCallback, useLayoutEffect, useRef } from "react";
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

const initTodos: Todo[] = [
  {
    id: "-1",
    text: "Q1 is high and urgent task.",
    isHigh: true,
    isUrgent: true,
    isCompleted: false,
  },
  {
    id: "-2",
    text: "Q2 is high but not urgent task.",
    isHigh: true,
    isUrgent: false,
    isCompleted: false,
  },
  {
    id: "-3",
    text: "Q3 is not high but urgent task.",
    isHigh: false,
    isUrgent: true,
    isCompleted: false,
  },
  {
    id: "-4",
    text: "Q4 is not high and not urgent task.",
    isHigh: false,
    isUrgent: false,
    isCompleted: false,
  },
  {
    id: "-5",
    text: "Q5 is a completed task.",
    isHigh: true,
    isUrgent: true,
    isCompleted: true,
  },
];

const TodosContextProvider: React.FC<{}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const drapIdRef = useRef("");

  useLayoutEffect(() => {
    //get todolist from local storage
    const reference = localStorage.getItem("todos");

    if (!reference) {
      localStorage.setItem("todos", JSON.stringify(initTodos));
      setTodos(initTodos);
    }

    if (reference) {
      const LocalTodos: Todo[] = JSON.parse(reference);
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
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(todoIndex, 1, todo);
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

  const dropTodoHandler = useCallback((tragetId: string) => {
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
      const updatedTodos = [...prevTodos.filter((item) => item.id !== drapId)];
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
  }, []);

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
