import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Login.css';

function Login({ handleLogin }) {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      return;
    }
    duckAuth.authorize(data.username, data.password)
      .then((res) => {
        if (res.jwt) {
          setData({ username: '', password: '' })
          localStorage.setItem('jwt', res.jwt)
          const userData = {
            username: res.user.username,
            email: res.user.email
          }
          handleLogin(userData);
          history.push('/ducks');
        }
      })
      .catch(err => console.log(err));
  }

    return (
      <div className="login">
        <Logo title={'CryptoDucks'}/>
        <p className="login__welcome">
          Это приложение содержит конфиденциальную информацию.
          Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
        </p>

        <p className="login__error">
          {data.message}
        </p>
        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            Логин:
          </label>
          <input id="username" required name="username" type="text" autoComplete="login" value={data.username}
                 onChange={handleChange}/>
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password" required name="password" type="password" autoComplete="current-password"
                 value={data.password} onChange={handleChange}/>
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
        </form>

        <div className="login__signup">
          <p>Ещё не зарегистрированы?</p>
          <Link to="/register" className="signup__link">Зарегистрироваться</Link>
        </div>
      </div>
    );
}

export default Login;
