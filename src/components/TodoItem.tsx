import Todo from '../models/todo';

const TodoItem: React.FC<{ item: Todo }> = ({item}) => {

    return (

        <li> 
            {item.text}
            {item.isHigh ? 'High':'Not High'}
            {item.isUrgent? 'Urget':'Not Urgent'}
        </li>
    )
};

export default TodoItem;
