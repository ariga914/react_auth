import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import Card from "../UI/Card/Card";
import classes from "./Profile.module.css";
import AuthContext from "../Store/AuthContext";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:5151/profile', {
            headers : {
                "Authorization" : token
            }
        })
        .then(response => {
            setUser(response.data.data);
            setError(null);
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    history.push("/login");
                    return;
                }
            }
            setError(error.message);
        });
    }, []);

    return (
        <Card className={classes.profile}>
            <h1>User Profile</h1>
            {error && <p>{error}</p>}
            {!!user &&
                <div>
                    <p>Name: {user.fullname}</p>
                    <p>Email: {user.email}</p>
                </div>
            }
        </Card>
    );
};

export default Profile;
