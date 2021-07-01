import React, { useState, useRef, useEffect, useReducer, Fragment, useContext,} from "react";
  
import Card from "../UI/Card/Card";
import classes from "./Auth.module.css";
import Button from "../UI/Button/Button";

import AuthContext from "../Store/AuthContext";
import axios from "axios";

  
const ChangePasswordForm = () => {
    {/**form state to check if data can be send*/}
    const [isFormValid, setIsFormValid] = useState(false);
    {/**form state in order to hide after update password successfully */}
    const [isShowForm, setShowForm] = useState(true);
    {/**to store error message */}
    const [message, setMessage] = useState(null);
    
    const authCtx = useContext(AuthContext);
    {/**variable to store token string for authenticated user */}
    const token = authCtx.token;

    {/**store value in password input */}
    const passwordInput = useRef();

    {/**check if password input is longer than 8 characters  */}
    const checkFormValidHandler = () => {
        if (passwordInput.current.value.length < 8 ) {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
    }
  
    {/**post updated password */}
    const submitHandler = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        const updateAPI = 'http://localhost:5151/change_password';
        axios.post(
            updateAPI, 
            { "new_password" : passwordInput.current.value},
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : token
            }
        })
        .then(response => {
            {/**if status code is 200, show message to tell update password successfully */}
            if (response.status === 200) {
                setMessage("Change password successfully");
                setShowForm(false);
                return;
            }
            {/**if status code is another one, show message to tell update password failed */}
            setMessage("Change password failed,");
        })
        .catch((error) => {
            {/**store some error message */}
            setMessage(error.message);
        });
    };
  
    return (
        <Fragment>
            <Card className={classes.auth}>
                {message != null && <p className={classes.error}>{message}</p>}
                {isShowForm && (
                    <form onSubmit={submitHandler}>
                        <div className={classes.control}>
                            <label htmlFor="password">New Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                ref={passwordInput}
                                onChange={checkFormValidHandler}
                            />
                        </div>
                        <div className={classes.actions}>
                            <Button
                                type="submit"
                                className={classes.btn}
                                disabled={!isFormValid}
                            >
                                Change Password
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </Fragment>
    );
};
  
export default ChangePasswordForm;
  