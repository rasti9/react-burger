import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import appStyle from "./App.module.css";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from '../../services/reducers/index.js';
import thunk from 'redux-thunk';
import {addConstructorIngredient, setCountIngredient, deleteConstructorIngredient, deleteCountIngredient} from '../../services/actions/index.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer); 

const AppWrapper = () => {
  return (
    <Provider store={store}> 
     <DndProvider backend={HTML5Backend}>
      <App /> 
    </DndProvider>
    </Provider>
  )
}

function App() {
  const dispatch = useDispatch();


  const [draggedElement, setDraggedElement] = useState({});
  const { ingredients_constructor } = useSelector(state => state.ingredientsConstructor);

  const handleDrop = useCallback((e, index) => {

    if (draggedElement.type === "bun") {
      let oPreviousBun = ingredients_constructor.find(item => item.type === "bun");
      if (oPreviousBun && oPreviousBun._id === draggedElement._id) {
          return;
      } else if (oPreviousBun && oPreviousBun._id !== draggedElement._id) {
          dispatch(deleteConstructorIngredient(oPreviousBun));
          dispatch(deleteCountIngredient(oPreviousBun));
          dispatch(addConstructorIngredient(draggedElement));
          dispatch(setCountIngredient(draggedElement));
          return;
      } else {
          dispatch(addConstructorIngredient(draggedElement));
          dispatch(setCountIngredient(draggedElement));
          return;
      }
    }
    dispatch(addConstructorIngredient(draggedElement));
    dispatch(setCountIngredient(draggedElement));

    setDraggedElement({});
  });

  const handleDrag = useCallback((e, currentElement) => {
    e.preventDefault();
    setDraggedElement(currentElement);
  });

  return (
      <div>
        <AppHeader />
        <main className={appStyle.mainStyle}>
          <div className={appStyle.columnStyle}>
            <h1>Соберите бургер</h1>
            <section className={appStyle.rowStyle}>
              <BurgerIngredients handleDrag={handleDrag}/>
              <BurgerConstructor handleDrop={handleDrop}/>
            </section>
          </div>
        </main>
      </div>
    ) 
}

export default AppWrapper;
