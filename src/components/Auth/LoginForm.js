import React, { useState, useRef, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';

import AuthContext from '../../components/Store/AuthContext';

const LoginForm = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [message, setMessage] = useState(null);

    const authCtx = useContext(AuthContext);

    const emailInput = useRef();
    const passwordInput = useRef();

    const checkFomValidHandler= () => {
        if (emailInput.current.value === "" ||
            passwordInput.current.value === "") {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            return;
        }
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        const signupAPI = `http://localhost:5151/login?email=${email}&password=${password}`;
        fetch(signupAPI)
        .then(reponse => {
            if (reponse.status !== 200) {
                throw new Error("Your email or password is invalid!");
            }

            return reponse.json();
        })
        .then(data => {
            authCtx.login(data.data);
        })
        .catch((error) => {
            setMessage(error.message);
        });
    }

    return (
        <Card className={classes.auth}>
            {message && <p className={classes.error}>{message}</p>}
            {authCtx.isLoggedIn && <p className={classes.success}>Login successfully.</p>}
            {!authCtx.isLoggedIn && 
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailInput}
                            onChange={checkFomValidHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordInput}
                            onChange={checkFomValidHandler}
                        />
                    </div>
                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn} disabled={!isFormValid}>
                            Login
                        </Button>
                    </div>
                </form>
            }
        </Card>
    );
};

export default LoginForm;
