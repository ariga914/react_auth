import React, { useState, useRef, useEffect, useReducer, Fragment } from 'react';

import Card from '../UI/Card/Card';
import classes from './Auth.module.css';
import Button from '../UI/Button/Button';

const SignupForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowForm, setShowForm] = useState(true);
  const [message, setMessage] = useState(null);

  const emailInput = useRef();
  const fullnameInput = useRef();
  const passwordInput = useRef();

  const checkFomValidHandler= () => {
    if (emailInput.current.value === "" ||
      fullnameInput.current.value === "" ||
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
    const signupAPI = 'http://localhost:5151/signup';
    const signupData = {
      email: emailInput.current.value,
      fullname: fullnameInput.current.value,
      password: passwordInput.current.value,
    };
    fetch(signupAPI, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
    .then(reponse => {
      if (reponse.status == 200) {
        setMessage("Signup successfully");
        setShowForm(false);
        return;
      }
      setMessage("Signup failed, please check information!");
    })
    .catch((error) => {
      setMessage(error.message);
    });
  }

  return (
    <Fragment>
      <Card className={classes.auth}>
        {message != null && <p className={classes.error}>{message}</p>}
        {isShowForm && 
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
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                ref={fullnameInput}
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
                Signup
              </Button>
            </div>
          </form>
        }
      </Card>
    </Fragment>
  );
};

export default SignupForm;
