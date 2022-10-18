// работа с api для регистрации и авторизации пользователя
import { SERVER_URL } from "./consts";

/*для проверки ответа от api*/
const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

/*функция для отправки запроса на регистрацию*/
export const register = (password, email, name) => {
  return fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
                        password: password, 
                        email: email,
                        name: name
                        })
    })
    .then(checkRes);
};

/*функция для отправки запроса на авторизацию*/
export const authorize = (password, email) => {
  return fetch(`${SERVER_URL}/signin`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
                        password: password, 
                        email: email 
                        })
    })
    .then(checkRes);
};

/*функция для отправки запроса на проверку токена*/
export const checkToken = (jwt) => {
  return fetch(`${SERVER_URL}/users/me`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
              },
    }).then(checkRes);
  };