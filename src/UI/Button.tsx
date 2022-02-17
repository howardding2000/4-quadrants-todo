import { useState } from 'react';
import classes from './Button.module.css';


const Button: React.FC<any> = (props) => {
    const [touching, isTouching] = useState(false);

    const touchStartHandler = ()    =>{
        isTouching(true);
    }
    const touchEndHandler = ()    =>{
        isTouching(false);
    }
    return <button className={`${classes.button} ${touching && classes.touching}`} onClick={props.onClick} onTouchStart={touchStartHandler} onTouchEnd={touchEndHandler}>{props.children}</button>
};

export default Button;
