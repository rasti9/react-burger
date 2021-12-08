import React, {useState,useCallback } from "react";
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from "./CardIngredients.module.css";
import PropTypes from 'prop-types';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentIngredient, deleteCurrentIngredient} from '../../services/actions/index.js';
import { useDrag } from "react-dnd";

const Card = (props) => {
 const {item, handleDrag} = props;
 const [visibleModal, setVisibleModal] = useState(false);
 const dispatch = useDispatch();
 let counter = 0;
 const { count_ingredients } = useSelector(state => state.ingredients);

 const oAddedIngredientInConstructor = count_ingredients.find(x => x.id === item._id);
 if (oAddedIngredientInConstructor) {
   counter = oAddedIngredientInConstructor.count;
 }

const handleOpenModal = useCallback((item) =>{
   dispatch(setCurrentIngredient(item));
   setVisibleModal(true);
  }, [])

  const handleCloseModal = useCallback(() =>{
    dispatch(deleteCurrentIngredient());
    setVisibleModal(false);
  }, []);

  const header = "Детали ингредиента";

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {item}
});

  return (  
    <div  ref={dragRef} className={cardStyle.card} onClick={() => handleOpenModal(item)}  onDrag={(e) => handleDrag(e, item)}>
       {counter !== 0 && <div className={cardStyle.counterStyle}>
          <Counter count={counter} size="default" />
        </div> }
        <img src={item.image} alt={item.name} />
        
        <div className={cardStyle.priceIcon} >
            <span className="text text_type_digits-default mr-2">{item.price}</span>
            <CurrencyIcon />
        </div>
        <span className="text text_type_main-defaul mb-3">{item.name}</span>
      {visibleModal && <Modal handleClose={handleCloseModal} header={header}>
      <IngredientDetails name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} image={item.image_large}/>
      </Modal>}
      </div>
  )
}

export default Card;