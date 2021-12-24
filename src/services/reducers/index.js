import { combineReducers } from 'redux';
import {getIngredients, modifyIngredientsConstructor, modifyCurrentIngredient, updateCurrentTab} from "./ingredients.js";
import {createOrder} from "./order.js";
import {manageUserData} from "./auth.js";

 
// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients : getIngredients,
    ingredientsConstructor : modifyIngredientsConstructor,
    currentIngredient : modifyCurrentIngredient,
    order : createOrder,
    tabs: updateCurrentTab,
    userInfo: manageUserData
}) 
