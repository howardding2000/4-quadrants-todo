import TodosContextProvider from './store/todos-context';
import TodosGroup from './components/TodosGroup';
import classes from './App.module.css';
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
          <TodosGroup />
        </div>
      </div>
    </TodosContextProvider>
  );
}

export default App;
