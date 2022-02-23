import React, { useState, useCallback, useEffect } from "react";
import { useDrapId } from "../hooks/use-drapId";
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

let dragTodo: Todo;

const TodosContextProvider: React.FC<{}> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [drapId, setDrapId] = useState<string>();
  const drapIdCtx = useDrapId({ drapId });

  useEffect(() => {
    //get todolist from local storage
    const reference = localStorage.getItem("todos");

    if (reference) {
      const updatedTodos = JSON.parse(reference);
      setTodos(updatedTodos);
    }
  }, []);

  const addTodoHandler = (text: string, isHigh: boolean, isUrgent: boolean) => {
    const newTodo = new Todo(text, isHigh, isUrgent);

    setTodos((prevTodos) => {
      const todos = prevTodos.concat(newTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    });
  };

  const removeTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      const todos = prevTodos.filter((item) => item.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    });
  }, []);

  const updateTodoHandler = useCallback((todo: Todo) => {
    setTodos((prevTodos) => {
      const todoIndex = prevTodos.findIndex((item) => item.id === todo.id);
      let todos = [...prevTodos];
      todos.splice(todoIndex, 1, todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      return todos;
    });
  }, []);

  const dragTodoHandler = (id: string) => {
    if (drapId === id) {
      return;
    }
    // store drag id
    setDrapId(id);
  };

  const dropTodoHandler = useCallback(
    (tragetId: string) => {
      const { drapId } = drapIdCtx;

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
    },
    [drapIdCtx]
  );

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
