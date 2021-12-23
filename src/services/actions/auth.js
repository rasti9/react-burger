import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,
    SAVE_USER_INFO_SUCCESS,
    SAVE_USER_INFO_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    RESET_PASSWORD_SUCCESS
} from './action.js';

import {URL} from '../../constants/constants.js';
import {getCookie, setCookie} from "../../utils/auth.js";

const URL_LOGIN= `${URL}/auth/login`;
const URL_LOGOUT= `${URL}/auth/logout`;
const URL_USER_INFO= `${URL}/auth/user`;
const URL_GET_ACCESS_TOKEN = `${URL}/auth/token`;
const URL_RESET_PASSWORD = `${URL}/password-reset`;

export const login = (email, password) => {
    return function(dispatch) {
     fetch(URL_LOGIN, {
        method: 'POST', 
        body: JSON.stringify({email: email, password: password}),
        headers: {
          'Content-Type': 'application/json'
        }
     })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        })
    }).catch( err => {
          dispatch({
              type: LOGIN_FAILED
          })
        })
  }
  } 
 

  const getAccessToken = (afterRefreshFunc) => {
    const refreshToken = getCookie('refreshToken');
    fetch(URL_GET_ACCESS_TOKEN, {
      method: 'POST', 
      body: JSON.stringify({token: refreshToken}),
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(res => res.ok ? res : Promise.reject(res))
   .then(res => {
      setCookie('accessToken', res.accessToken);
      afterRefreshFunc();
  }).catch( err => {
        console.log(err);
      })
  }


  export const getUserInfo = (bUseRefreshToken) => {
    const accessToken = getCookie('accessToken');
    return function(dispatch) {
     fetch(URL_USER_INFO, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
     }).then(response => {
      if (response.status === 401) {
        return Promise.reject(response)
      }
      else if (response && response.ok === true) {
          return response.json();
      } else {
          if (response.ok === false && bUseRefreshToken === false) {
             return getAccessToken(getUserInfo(true));
          }
      }
    }).then(res => {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          user: res.user
        })
    }).catch( (err) => {
          dispatch({
            type: GET_USER_INFO_FAILED
          })
        })
  }
  } 

  export const saveUserInfo = (name, email, bUseRefreshToken) => {
    const accessToken = getCookie('accessToken');
    return function(dispatch) {
     fetch(URL_USER_INFO, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
          body: JSON.stringify({name: name, email: email}),
        }
     }).then(response => {
      if (response && response.ok === true) {
          return response.json();
      } else {
          if (response.ok === false && bUseRefreshToken === false) {
             return getAccessToken(saveUserInfo(name, email, true));
          }
      }
    }).then(res => {
        dispatch({
          type: SAVE_USER_INFO_SUCCESS,
          user: res.user
        })
    }).catch( err => {
          dispatch({
              type: SAVE_USER_INFO_FAILED
          })
        })
  }
  } 

  export const resetPassword = (email) => {
    return function(dispatch) {
    fetch(URL_RESET_PASSWORD, {
      method: 'POST', 
      body: JSON.stringify({email: email}),
      headers: {
        'Content-Type': 'application/json'
      }
   })
   .then(res => res.ok ? res : Promise.reject(res))
   .then(data => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      })
    })    
   .catch( err => {
        console.log(err)
      })
  }
}

  export const logOut = () => {
    const refreshToken = getCookie('refreshToken');
    return function(dispatch) {
     fetch(URL_LOGOUT, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          body: JSON.stringify({token: refreshToken}),
        }
     })
     .then(res => res.ok ? res : Promise.reject(res))
     .then(data => {
       dispatch({
          type: LOGOUT_SUCCESS
         })
      })
    .catch(err => {
        console.log(err)
        })
  }
  } 