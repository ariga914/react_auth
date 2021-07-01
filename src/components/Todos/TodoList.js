import React, { useContext, useState, useEffect, Fragment } from "react";
import axios from "axios";

import Card from "../UI/Card/Card";
import Todo from "./Todo";
import AuthContext from "../Store/AuthContext";

import classes from "./TodoList.module.css";

const TodoList = () => {
    [/**to store got todoList from API server */]
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    [/**to store error message */]
    const [message, setMessage] = useState(null);
    
    const ctxAuth = useContext(AuthContext);
    [/**variable to store token string for authenticated user */]
    const token = ctxAuth.token;

    const getAPI = "http://localhost:5151/todos";

    {/**get Todo list from API server */}
    function fetchTodosHandler () {
        setIsLoading(true);
    
        axios.get(getAPI, {
            headers : {
                "Authorization" : token
            }
        })
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            {/**make an array to store each todo object */}
            const todoList = data.data.map((todoData) => {
                return {
                    title : todoData.title,
                    description : todoData.description,
                };
            });
            {/**assign todoList (array) to state */}
            setTodos(todoList);
            {/**finsih loading */}
            setIsLoading(false);
        })
        .catch((error) => {
            {/**store some error message */}
            setMessage(error.message);
        })
    }

    useEffect(() => {
        {/**every time page reloaded, fetch todoList */}
        fetchTodosHandler();
    }, []);

    return (
        <Fragment>
            {message && <p>{message}</p>}
            {isLoading && <p>Loading Todo Lists]...</p>}
            {!isLoading && todos.length === 0 && <p>No todos.</p>}
            {!isLoading && todos.length > 0 &&
                <ul className={classes["todos-list"]}>
                    {/**pass props each todo component */}
                    {todos.map((todo) =>　(
                        <Todo
                            key={todo.id}
                            title={todo.title}
                            description={todo.description} 
                        />
                    ))}
                </ul>
            }
        </Fragment>
    );
};

export default TodoList;
