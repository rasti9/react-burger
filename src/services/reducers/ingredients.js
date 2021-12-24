import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    DELETE_CURRENT_INGREDIENT,
    ADD_INGREDIENT_CONSTRUCTOR,
    SET_COUNT_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
    DELETE_COUNT_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
    UPDATE_CURRENT_TAB,
    SET_MODAL_OPEN,
    SET_MODAL_CLOSE
} from '../actions/action.js';

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
    currentIngredient: {},
    isModalOpen : true
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


export const getIngredients = (state = initialStateIngredients, action) => {
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
            const item = state.countIngredients.find(item => item.id === action.id);
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

export const modifyIngredientsConstructor = (state = initialStateIngredientsConstructor, action) => {
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

export const modifyCurrentIngredient = (state = initialStateCurrentIngredient, action) => {
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
          case SET_MODAL_OPEN: {
            return {
                  ...state,
                  // Запрос начал выполняться
                  isModalOpen: true
            } 
          }  
          case SET_MODAL_CLOSE: {
            return {
                  ...state,
                  // Запрос начал выполняться
                  isModalOpen: false
            } 
          } 
        default: {
            return state
        }
    }
}

export const updateCurrentTab = (state = initialStateTabs, action) => {
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