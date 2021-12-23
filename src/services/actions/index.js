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
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    RESET_PASSWORD,
    LOGIN
} from './action.js';
import {URL} from '../../constants/constants.js';

const URL_INGREDIENTS = `${URL}/ingredients`;
const URL_CREATE_ORDER = `${URL}/orders`;
const URL_RESET_PASSWORD = `${URL}/password-reset`;


export const getIngredients = () => {
    return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    })
     fetch(URL_INGREDIENTS).then(response => {
      if (response && response.ok) {
          return response.json();
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    }).then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
    }).catch( err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
  }
} 

export const setCurrentIngredient = (item) => {
  return function(dispatch) {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      currentIngredient: item
    })
  }
}

export const deleteCurrentIngredient = () => {
  return function(dispatch) {
    dispatch({
      type: DELETE_CURRENT_INGREDIENT
    })
  }
}

export const addConstructorIngredient = (item) => {
  return function(dispatch) {
    dispatch({
      type: ADD_INGREDIENT_CONSTRUCTOR,
      item: item
    })
  }
}

export const setCountIngredient = (item) => {
  return function(dispatch) {
    dispatch({
      type: SET_COUNT_INGREDIENT_CONSTRUCTOR,
      item: item
    })
  }
}

export const deleteConstructorIngredient = (customID) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_INGREDIENT_CONSTRUCTOR,
      customID: customID
    })
  }
}

export const moveConstructorIngredient = (dragIndex, hoverIndex) => {
  return function(dispatch) {
    dispatch({
      type: MOVE_INGREDIENT_CONSTRUCTOR,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    })
  }
}

export const deleteCountIngredient = (item) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_COUNT_INGREDIENT_CONSTRUCTOR,
      item: item
    })
  }
}

export const updateCurrentTab = (id, ratio) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_CURRENT_TAB,
      id: id,
      ratio: ratio
    })
  }
}

export const createOrder = (oID) => {
  return function(dispatch) {
  dispatch({
    type: CREATE_ORDER
  })
   fetch(URL_CREATE_ORDER, {
      method: 'POST', 
      body: JSON.stringify(oID),
      headers: {
        'Content-Type': 'application/json'
      }
   }).then(response => {
    if (response && response.ok) {
        return response.json();
    } else {
      dispatch({
        type: CREATE_ORDER_FAILED
      })
    }
  }).then(res => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        order: res.order
      })
  }).catch( err => {
        dispatch({
            type: CREATE_ORDER_FAILED
        })
      })
}
} 


