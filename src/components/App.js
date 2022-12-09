import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  })
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt') ;
    if (token) {
      duckAuth.getContent(token).then((res) => {
        if (res) {
          let userData = {
            username: res.username,
            email: res.email,
          };
          handleLogin(userData)
          history.push('/ducks');
        }
      });
    }
  }, [])

  const handleLogin = (userData) => {
    setLoggedIn(true)
    setUserData(userData)
  }

  return (
    <Switch>
      <ProtectedRoute
        path="/ducks"
        loggedIn={loggedIn}
        component={Ducks}
      />
      <ProtectedRoute
        path="/my-profile"
        loggedIn={loggedIn}
        userData={userData}
        component={MyProfile}
      />
      <Route path="/login">
        <div className="loginContainer">
          <Login handleLogin={handleLogin} />
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register/>
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/ducks"/> : <Redirect to="/login"/>}
      </Route>
    </Switch>
  );
}

export default App;
