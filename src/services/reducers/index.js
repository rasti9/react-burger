
import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    ADD_INGREDIENT_CONSTRUCTOR,
    SET_COUNT_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
    DELETE_COUNT_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
    UPDATE_CURRENT_TAB,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    GET_USER_INFO_SUCCESS,
    SAVE_USER_INFO_SUCCESS,
    LOGOUT_SUCCESS, 
    GET_USER_INFO_FAILED,
    RESET_PASSWORD_SUCCESS
} from '../actions/action.js';

import {setCookie} from "../../utils/auth.js";

const initialStateIngredients =  {
        ingredients: [],
        countIngredients: [],
        ingredientsRequest: [],
        ingredientsFailed: []        
    }

    const initialStateIngredientsConstructor = {
        ingredientsConstructor: []
    }

    const initialStateCurrentIngredient = {
        currentIngredient: {}
    }

    const initialStateOrder = {
        order: {},
        orderRequest: [],
        orderFailed : []
    }

    const initialStateTabs = {
        tabs: [
            {
              id: 'bun',
              title: 'Булки',
              ratio: 0
            },
            {
            id: 'sauce',
            title: 'Соусы',
            ratio: 0
            },
            {
            id: 'fill',
            title: 'Начинки',
            ratio: 0
            },
        ]
    }

    const initialUserInfo = {
        user: {},
        isAuth : false,
        isLoggedOut: false,
        isPasswordReset: false
    }


const getIngredients = (state = initialStateIngredients, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
          return {
                ...state,
                // Запрос начал выполняться
                ingredientsRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                ingredientsFailed: false,
          };
        }
        case GET_INGREDIENTS_SUCCESS: {
          return { 
                    ...state, 
                    // Запрос выполнился успешно, помещаем полученные данные в хранилище
                    ingredients: action.ingredients, 
                    countIngredients: action.ingredients.map(function(item) {
                        return {id : item._id, count: 0};
                      }),
                    // Запрос закончил своё выполнение
                    ingredientsRequest: false 
                };
        }
        case GET_INGREDIENTS_FAILED: {
          return { 
                    ...initialStateIngredients, 
                    // Запрос выполнился с ошибкой, 
                    // выставляем соответсвующие значения в хранилище
                    ingredientsFailed: true, 
                    // Запрос закончил своё выполнение
                    ingredientsRequest: false 
                };
        }
        case SET_COUNT_INGREDIENT_CONSTRUCTOR: {
            const item = state.countIngredients.find(item => item.id === action.item._id);
            return {
                  ...state,                        
                  countIngredients: [...state.countIngredients, {...item, count: item.count++}] 
            } 
          }
        case DELETE_COUNT_INGREDIENT_CONSTRUCTOR: {
            const item = state.countIngredients.find(item => item.id === action.item._id);
            return {
                    ...state,                        
                    countIngredients: [...state.countIngredients, {...item, count: item.count--}] 
            } 
            }  
                default: {
                    return state
                }
            }
 }

const modifyIngredientsConstructor = (state = initialStateIngredientsConstructor, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
          return {
                // Запрос начал выполняться state.tabs.map(tab => tab.id === action.id ? {...tab, ratio: action.ratio} : tab)
                ingredientsConstructor: [...state.ingredientsConstructor, action.item]                        
          } 
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            return {
                  ingredientsConstructor: state.ingredientsConstructor.filter(item => item.customID !== action.customID)
            } 
          }
          case MOVE_INGREDIENT_CONSTRUCTOR: {
            const bunElement = state.ingredientsConstructor.find(item => item.type === "bun");
            const newIngredientsConstructor = [...state.ingredientsConstructor].filter(item => item.type !== "bun");
            const dragIngredient = newIngredientsConstructor[action.dragIndex];

            newIngredientsConstructor.splice(action.dragIndex, 1);
            newIngredientsConstructor.splice(action.hoverIndex, 0, dragIngredient);
            if (bunElement) {
                newIngredientsConstructor.push(bunElement);
            }
            return {
                  ...state,
                  ingredientsConstructor: newIngredientsConstructor
            } 
          }  
        default: {
            return state
        }
    }
}

const modifyCurrentIngredient = (state = initialStateCurrentIngredient, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT: {
          return {
                ...state,
                // Запрос начал выполняться
                currentIngredient: action.currentIngredient
          } 
        }
        case DELETE_CURRENT_INGREDIENT: {
            return {
                  ...state,
                  // Запрос начал выполняться
                  currentIngredient: {}
            } 
          }
        default: {
            return state
        }
    }
}

const createOrder = (state = initialStateOrder, action) => {
    switch (action.type) {
        case CREATE_ORDER: {
          return {
                ...state,
                // Запрос начал выполняться
                orderRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса 
                // на случай, если он был и завершился с ошибкой
                orderFailed: false,
          };
        }
        case CREATE_ORDER_SUCCESS: {
          return { 
                    ...state, 
                    // Запрос выполнился успешно, помещаем полученные данные в хранилище
                    order: action.order, 
                    // Запрос закончил своё выполнение
                    orderRequest: false 
                };
        }
        case CREATE_ORDER_FAILED: {
          return { 
                    ...initialStateOrder, 
                    // Запрос выполнился с ошибкой, 
                    // выставляем соответсвующие значения в хранилище
                    orderFailed: true, 
                    // Запрос закончил своё выполнение
                    orderRequest: false 
                };
        }
            default: {
                return state
            }
        }
}

const updateCurrentTab = (state = initialStateTabs, action) => {
    switch (action.type) {
    case UPDATE_CURRENT_TAB: {
        return { 
                  ...state, 
                  // Запрос выполнился с ошибкой, 
                  // выставляем соответсвующие значения в хранилище
                  tabs: state.tabs.map(tab => tab.id === action.id ? {...tab, ratio: action.ratio} : tab)
              };
      }
          default: {
              return state
          }
      }
}

const manageUserData = (state = initialUserInfo, action) => { 
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
 

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients : getIngredients,
    ingredientsConstructor : modifyIngredientsConstructor,
    currentIngredient : modifyCurrentIngredient,
    order : createOrder,
    tabs: updateCurrentTab,
    userInfo: manageUserData
}) 
