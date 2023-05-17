export const BASE_URL = 'https://auth.nomoreparties.co';

const getJson = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.status;
  }
  // return (
  //   res.ok ? res.json() : Promise.reject(`${res.status}`))
}

export const signUp = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  }).then(res => getJson(res))
};

export const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => getJson(res))
    .then((data) => {
      if (data.token) {
        return data;
      } else {
        return;
      }

    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(res => getJson(res))
}


// _____undefined________________________________
// const BASE_URL = 'https://auth.nomoreparties.co';

// function makeRequest(url, method, email, password, token) {
//   const options = {
//     method,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//   }

//   if (email, password) {
//     options.body = JSON.stringify({
//       email,
//       password
//     })
//   };

//   if (token) {
//     options.headers.Authorization = `Bearer ${token}`;
//   }

//   return fetch(`${BASE_URL}${url}`, options)
//     // .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
//     .then((res) => {
//       if (res.ok) {
//         res.json()
//       } else {
//         Promise.reject(`Ошибка: ${res.status}`)
//       }
//     })
//     .catch(err => console.log(err))
// }

// export const signUp = (email, password) => {
//   console.log(email, password);
//   makeRequest(
//     '/signup',
//     'POST',
//     email,
//     password
//   )
// }

// export const signIn = (email, password, token) => {
//   makeRequest(
//     '/signin',
//     'POST',
//     email,
//     password,
//     token
//   )
// }

// export const getUserData = (token) => {
//   makeRequest(
//     '/users/me',
//     'GET',
//     null,
//     token
//   )
// }