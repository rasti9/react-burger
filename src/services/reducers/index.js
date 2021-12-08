
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
    URL
} from '../../constants/constants.js';

const initialStateIngredients =  {
        ingredients: [],
        count_ingredients: [],
        ingredientsRequest: [],
        ingredientsFailed: []        
    }

    const initialStateIngredientsConstructor = {
        ingredients_constructor: []
    }

    const initialStateCurrentIngredient = {
        current_ingredient: {}
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
                    count_ingredients: action.ingredients.map(function(item) {
                        return {id : item._id, count: 0};
                      }),
                    // Запрос закончил своё выполнение
                    ingredientsRequest: false 
                };
        }
        case GET_INGREDIENTS_FAILED: {
          return { 
                    ...state, 
                    // Запрос выполнился с ошибкой, 
                    // выставляем соответсвующие значения в хранилище
                    ingredientsFailed: true, 
                    // Запрос закончил своё выполнение
                    ingredientsRequest: false 
                };
        }
        case SET_COUNT_INGREDIENT_CONSTRUCTOR: {
            let item = state.count_ingredients.find(item => item.id === action.item._id);
            return {
                  ...state,                        
                  count_ingredients: [...state.count_ingredients, {...item, count: item.count++}] 
            } 
          }
        case DELETE_COUNT_INGREDIENT_CONSTRUCTOR: {
            let item = state.count_ingredients.find(item => item.id === action.item._id);
            return {
                    ...state,                        
                    count_ingredients: [...state.count_ingredients, {...item, count: item.count--}] 
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
            let dateStamp = new Date().getTime();
            action.item = {...action.item, key: dateStamp, customID : dateStamp}
          return {
                ...state,
                // Запрос начал выполняться state.tabs.map(tab => tab.id === action.id ? {...tab, ratio: action.ratio} : tab)
                ingredients_constructor: [...state.ingredients_constructor, action.item]                        
                //count_ingredients_constructor: state.count_ingredients_constructor.map(item => item.id === action.item._id ? {...item, count: item.count++} : item)
          } 
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            return {
                  ...state,
                  // Запрос начал выполняться
                  ingredients_constructor: state.ingredients_constructor.filter(item => item.customID !== action.item.customID)
            } 
          }
          case MOVE_INGREDIENT_CONSTRUCTOR: {
            const drag_ingredient = state.ingredients_constructor[action.dragIndex];
            let new_ingredients_constructor = [...state.ingredients_constructor];
            new_ingredients_constructor.splice(action.dragIndex, 1);
            new_ingredients_constructor.splice(action.hoverIndex, 0, drag_ingredient);
            return {
                  ...state,
                  // Запрос начал выполняться
                  ingredients_constructor: [...new_ingredients_constructor]
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
                current_ingredient: action.current_ingredient
          } 
        }
        case DELETE_CURRENT_INGREDIENT: {
            return {
                  ...state,
                  // Запрос начал выполняться
                  current_ingredient: {}
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
            debugger;
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
                    ...state, 
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

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients : getIngredients,
    ingredientsConstructor : modifyIngredientsConstructor,
    currentIngredient : modifyCurrentIngredient,
    order : createOrder,
    tabs: updateCurrentTab
}) 
