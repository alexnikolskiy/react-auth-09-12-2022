export const BASE_URL = 'https://api.nomoreparties.co';

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};


