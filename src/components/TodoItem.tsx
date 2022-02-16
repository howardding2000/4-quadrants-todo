import Todo from '../models/todo';
import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ item: Todo }> = ({ item }) => {
  return (
    <li className={classes.list}>
      {item.text}
      <section>
        <div>{item.isHigh ? 'High' : 'Not High'}</div>
        <div>{item.isUrgent ? 'Urget' : 'Not Urgent'}</div>
      </section>
    </li>
  );
};

export default TodoItem;
