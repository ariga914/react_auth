import React, { Fragment, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthContext from './components/Store/AuthContext';
import ProfilePage from './pages/ProfilePage';
import ChangePasseordPage from './pages/ChangePasswordPage';
import TodoListPage from './pages/TodoListPage';
import CreateTodoPage from './pages/CreateTodoPage';

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
                    {authCtx.isLoggedIn && <ProfilePage />}
                    
                    {/*if user not loggedin, redirect to home*/}
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                </Route>
                {/** Navigations to Todo list page
                 *   if user not loggedin, redirect to home
                 */}
                <Route path="/todos" exact>
                    {authCtx.isLoggedIn && <TodoListPage />}
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                </Route>
                {/** Navigations to create todo form
                 *   if user not loggedin, redirect to home
                 */}
                <Route path="/todos/create">
                    {authCtx.isLoggedIn && <CreateTodoPage />}
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                </Route>
                {/** Navigations to password change form
                 *   if user not loggedin, redirect to home
                 */}
                <Route path="/change">
                    {authCtx.isLoggedIn && <ChangePasseordPage />}
                    {!authCtx.isLoggedIn && <Redirect to="/" />}
                </Route>
            </Switch>
        </Layout>
    );
}


export default App;
