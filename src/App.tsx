import Todos from './components/Todos';
import TodosContextProvider from './store/todos-context';

import classes from './App.module.css';
import NewTodo from './components/NewTodo';

function App() {
  return (
    <TodosContextProvider>
      <div className={classes.App}>
        <div className={classes.todoWapper}>
          <NewTodo />
          <Todos />
        </div>
      </div>
    </TodosContextProvider>
  );
}

export default App;
