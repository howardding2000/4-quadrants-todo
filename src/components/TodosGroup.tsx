import Todos from './Todos';
import classes from './TodosGroup.module.css';

const TodosGroup: React.FC = () => {
  return (
    <>
      <ul className={classes.group}>
        <li>All</li>
        <li>H/U</li>
        <li>H/NU</li>
        <li>NH/U</li>
        <li>NH/NU</li>
        <li>Done</li>
      </ul>
      <Todos />
    </>
  );
};

export default TodosGroup;
