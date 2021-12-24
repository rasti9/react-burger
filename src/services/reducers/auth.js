import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    GET_USER_INFO_SUCCESS,
    SAVE_USER_INFO_SUCCESS,
    LOGOUT_SUCCESS, 
    GET_USER_INFO_FAILED,
    RESET_PASSWORD_SUCCESS
} from '../actions/action.js';
import {setCookie} from "../../utils/auth.js";

const initialUserInfo = {
    user: {},
    isAuth : false,
    isLoggedOut: false,
    isPasswordReset: false
}

export const manageUserData = (state = initialUserInfo, action) => { 
switch (action.type) {
      case LOGIN_SUCCESS: {
         setCookie('refreshToken', action.refreshToken);
         setCookie('accessToken', action.accessToken);
        return { 
                  ...state, 
                  // Запрос выполнился успешно, помещаем полученные данные в хранилище
                  user: action.user,
                  isAuth: true,
                  isLoggedOut: false
              };
        }
        case LOGIN_FAILED: {
            return { 
                    ...initialUserInfo
                };
        }
        case GET_USER_INFO_SUCCESS: {
        return { 
                    ...state, 
                    // Запрос выполнился успешно, помещаем полученные данные в хранилище
                    user: action.user,
                    isAuth: true
                };
        }
        case GET_USER_INFO_FAILED: {
            return { 
                    ...state,
                    user: {},
                    isAuth: false
                    };
            }
        case SAVE_USER_INFO_SUCCESS: {
            return { 
                    ...state, 
                    // Запрос выполнился успешно, помещаем полученные данные в хранилище
                    user: action.user
                };
        }
        case RESET_PASSWORD_SUCCESS: {
            return { 
                ...state,
                isPasswordReset: true
            };
        }
        case LOGOUT_SUCCESS: {
            document.cookie = "accessToken=; Max-Age=0";
            document.cookie = "refreshToken=; Max-Age=0";
            return { 
                    ...initialUserInfo,
                    isLoggedOut: true
                };
        }
          default: {
              return state
          }
      }
      

}