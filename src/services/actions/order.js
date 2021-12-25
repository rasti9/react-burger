import {
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from './action.js';

import {URL} from '../../constants/constants.js';

const URL_CREATE_ORDER = `${URL}/orders`;

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