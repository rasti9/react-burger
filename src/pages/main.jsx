import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import mainStyle from "./main.module.css";
import {addConstructorIngredient, setCountIngredient, deleteConstructorIngredient, deleteCountIngredient} from '../services/actions/ingredients.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


export function MainPage() {
  const dispatch = useDispatch();
  const { ingredientsConstructor } = useSelector(state => state.ingredientsConstructor);
  const {ingredients} = useSelector(state => state.ingredients);

  const handleDrop = (({_id}) => {
    const dateStamp = new Date().getTime();
    const draggedElement = ingredients.find(item => item._id === _id);
    const copyDraggedElement = {...draggedElement, key: dateStamp, customID : dateStamp};

    if (copyDraggedElement.type === "bun") {
      const oPreviousBun = ingredientsConstructor.find(e => e.type === "bun");
      if (oPreviousBun && oPreviousBun._id === draggedElement._id) {
          return;
      } else if (oPreviousBun && oPreviousBun._id !== copyDraggedElement._id) {
          dispatch(deleteConstructorIngredient(oPreviousBun));
          dispatch(deleteCountIngredient(oPreviousBun));
          dispatch(addConstructorIngredient(copyDraggedElement));
          dispatch(setCountIngredient(copyDraggedElement));
          return;
      } else {
          dispatch(addConstructorIngredient(copyDraggedElement));
          dispatch(setCountIngredient(copyDraggedElement));
          return;
      }
    }
    dispatch(addConstructorIngredient(copyDraggedElement));
    dispatch(setCountIngredient(copyDraggedElement));

  });

  return (
      <div>
        <main className={mainStyle.mainStyle}>
          <div className={mainStyle.columnStyle}>
          <p className={mainStyle.defaultStyle}>Соберите бургер</p>
            <section className={mainStyle.rowStyle}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor handleDrop={handleDrop}/>
            </DndProvider>
            </section>
          </div>
        </main>
      </div>
    ) 
}

// export default MainPage;
