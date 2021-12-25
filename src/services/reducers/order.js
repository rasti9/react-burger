import {
    CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED
} from '../actions/action.js';


const initialStateOrder = {
    order: {},
    orderRequest: [],
    orderFailed : []
}

export const createOrder = (state = initialStateOrder, action) => {
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
