import classes from './Button.module.css';


const Button: React.FC = (props) => {

    return <button className={classes.button}>{props.children}</button>
};

export default Button;
