import React from 'react';
import classes from './TodoList.module.css';

{/**show each todo with props from TodoList component */}
const Todo = (props) => {
    return (
        <li className={classes.todo}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </li>
    )
}

export default Todo;
