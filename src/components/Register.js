import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Register.css';

function Register() {
  const [data, setData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      let { username, password, email } = data;
      duckAuth.register(username, password, email).then((res) => {
        if (res.statusCode !== 400) {
          setData({
            ...data,
            message: '',
          });
          history.push('/login')
        } else {
          setData({
            ...data,
            message: 'Что-то пошло не так!',
          });
        }
      });
    }
  }

    return (
      <div className="register">
        <Logo title={'CryptoDucks'}/>
        <p className="register__welcome">
          Пожалуйста, зарегистрируйтесь.
        </p>
        <p className="register__error">
          {data.message}
        </p>
        <form onSubmit={handleSubmit} className="register__form">
          <label htmlFor="username">
            Логин:
          </label>
          <input id="username" name="username" type="text" autoComplete="username" value={data.username}
                 onChange={handleChange}/>
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" name="email" type="email" autoComplete="email" value={data.email}
                 onChange={handleChange}/>
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password" name="password" type="password" autoComplete="new-password" value={data.password}
                 onChange={handleChange}/>
          <label htmlFor="confirmPassword">
            Подтвердите пароль:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password"
                 value={data.confirmPassword} onChange={handleChange}/>
          <div className="register__button-container">
            <button type="submit" className="register__link">Зарегистрироваться</button>
          </div>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
        </div>
      </div>
    );
}

export default Register;
