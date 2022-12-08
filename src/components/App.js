import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
    };

    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.tokenCheck();
  };

  handleLogin(userData) {
    this.setState({
      loggedIn: true,
      userData
    })
  }

  tokenCheck() {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      duckAuth.getContent(jwt).then((res) => {
        if (res) {
          let userData = {
            username: res.username,
            email: res.email,
          };
          this.setState({
            loggedIn: true,
            userData,
          }, () => {
            this.props.history.push('/ducks');
          });
        }
      });
    }
  };

  render() {
    return (
      <Switch>
        <ProtectedRoute
          path="/ducks"
          loggedIn={this.state.loggedIn}
          component={Ducks}
        />
        <ProtectedRoute
          path="/my-profile"
          loggedIn={this.state.loggedIn}
          userData={this.state.userData}
          component={MyProfile}
        />
        <Route path="/login">
          <div className="loginContainer">
            <Login handleLogin={this.handleLogin} />
          </div>
        </Route>
        <Route path="/register">
          <div className="registerContainer">
            <Register/>
          </div>
        </Route>
        <Route>
          {this.state.loggedIn ? <Redirect to="/ducks"/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);
