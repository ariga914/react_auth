import React, { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthContext from './components/Store/AuthContext';
import ProfilePage from './pages/ProfilePage';

function App() {
    const authCtx = useContext(AuthContext);
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <IndexPage />
                </Route>
                <Route path="/signup">
                    {authCtx.isLoggedIn && <Redirect to="/" />}
                    {!authCtx.isLoggedIn && <SignupPage />}
                </Route>
                <Route path="/login">
                    {authCtx.isLoggedIn && <Redirect to="/" />}
                    {!authCtx.isLoggedIn && <LoginPage />}
                </Route>
                <Route path="/profile">
                    <ProfilePage />
                </Route>
            </Switch>
        </Layout>
    );
}


export default App;
