import React, { useState, useContext, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import classes from "./TodoList.module.css";
import AuthContext from "../Store/AuthContext";

function CreateTodoForm() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    {/**to store error message */}
    const [message, setMessage] = useState(null);

    const authCtx = useContext(AuthContext);
    {/**variable to store token stirng for authenticated user*/}
    const token = authCtx.token;

    {/**form state to check if data can be send*/}
    const [formIsValid, setFormIsvalid] = useState(false);

    {/**reducer fuction to validate tilte (check title state if its length is less than 250 chars)
        when onChange & onBlur  */}
    const titleReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return {value : action.value, isvalid : action.value.length < 250};
        }
        if (action.type === 'INPUT_BLUR') {
            return {value : state.value, isvalid : state.value.length < 250};
        }
        return {value : '', isvalid : false};
    }

    {/**reducer fuction to validate description (check desc state if its data type is text)
        when onChange & onBlur */}
    const descReducer = (state, action) => {
        if (action.type === 'USER_INPUT') {
            return {value : action.value, isvalid : typeof(action.value) === 'string'};
        }
        if (action.type === 'INPUT_BLUR') {
            return {value : state.value, isvalid : typeof(state.value) === 'string'};
        }
        return {value : '', isvalid : false};
    }

    {/**define useReducer for title input */}
    const [titleState, dispatchTitle] = useReducer(titleReducer, {
        value : '',
        isvalid : null,
    });

    {/**define useReducer for description input */}
    const [descState, dispatchDesc] = useReducer(descReducer, {
        value : '',
        isvalid : null,
    });

    {/**make variable from State as arrugument of useEffect */}
    const {isvalid : titleIsValid} = titleState;
    const {isvalid : descIsValid} = descState;

    {/**check form validation state's boolean in order to enable submit button to push or disable
      * whenever each input state changes*/}
    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsvalid(titleIsValid && descIsValid);
        }, 500);
        //cleanup
        return () => {
            clearTimeout(identifier);
        }
    }, [titleIsValid, descIsValid]);

    {/**trigger fn to check titile input state on value change */}
    const titleChangeHandler = (event) => {
        dispatchTitle({type : 'USER_INPUT', value : event.target.value});
    };

     {/**trigger fn to check desc input state on value change */}
    const descChangeHandler = (event) => {
        dispatchDesc({type : 'USER_INPUT', value : event.target.value});
    };

    {/**trigger fn to check titile input state on focus blurred from input */}
    const validateTitleHandler = () => {
        dispatchTitle({type : 'INPUT_BLUR'});
    };

    {/**trigger fn to check desc input state on focus blurred from input */}
    const validateDescHandler = () => {
        dispatchDesc({type : 'INPUT_BLUR'});
    };

    {/**on submit, post new created todo to API server */}
    const submitHandler = (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        {/**data body */}
        const newTodo = {
            "title" : titleState.value,
            "description" : descState.value,
        };

        const createAPI = "http://localhost:5151/todos";
        axios.post(
            createAPI,
            newTodo,
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : token
                }
            }
        )
        .then((response) => {
            {/**if process end successfully, change loading state & redirect to todoList page */}
            if (response.status === 200) {
                setIsLoading(false);
                history.push('/todos');
            }
            {/**if process failed, show message to tell that */}
            setMessage("Create Todo failed.")
        })
        .catch((error) => {
            {/**store some error in this process */}
            setMessage(error.message);
        })
    };

    return (
        <div className={classes.todo}>
            <h2>Create Todo</h2>
            {isLoading && <p>Creating Todo...</p>}
            {message && <p>{message}</p>}
            <form onSubmit={submitHandler}>
                <p>
                    <label>Title</label>
                    <input 
                        type="text"
                        onChange={titleChangeHandler}
                        onBlur={validateTitleHandler}
                    />
                </p>
                <p>
                    <label>Description</label>
                    <textarea 
                        type="text" 
                        onChange={descChangeHandler}
                        onBlur={validateDescHandler}
                        cols="50" 
                        rows="4"
                    />
                </p>
                <p>
                    <button 
                        type="submit"
                        disabled={!formIsValid}
                    >
                        Create Todo
                    </button>
                </p>
            </form>
        </div>
    );
}

export default CreateTodoForm;