import Todos from './components/Todos';
import TodosContextProvider from './store/todos-context';

import classes from './App.module.scss';
import NewTodo from './components/NewTodo';

function App() {
  return (
    <TodosContextProvider>
      <div className={classes.App}>
        <header>
          <h1>4 Quadrants Todo</h1>
        </header>
        <div className={classes.todoWapper}>
          <NewTodo />
          <Todos />
        </div>
      </div>
    </TodosContextProvider>
  );
}

export default App;
