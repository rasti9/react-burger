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
 const {_id, item} = props;
 const [visibleModal, setVisibleModal] = useState(false);
 const dispatch = useDispatch();
 let counter = 0;
 const { countIngredients } = useSelector(state => state.ingredients);

 const oAddedIngredientInConstructor = countIngredients.find(x => x.id === _id);
 if (oAddedIngredientInConstructor) {
   counter = oAddedIngredientInConstructor.count;
 }

const handleOpenModal = useCallback((item) =>{
   dispatch(setCurrentIngredient(item));
   setVisibleModal(true);
  }, [dispatch])

  const handleCloseModal = useCallback(() =>{
    dispatch(deleteCurrentIngredient());
    setVisibleModal(false);
  }, [dispatch]);

  const header = "Детали ингредиента";

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {_id}
});

  return (  
    <div  ref={dragRef} className={cardStyle.card} onClick={() => handleOpenModal(item)} >
       {counter !== 0 && <div className={cardStyle.counterStyle}>
          <Counter count={counter} size="default" />
        </div> }
        <img src={item.image} alt={item.name} />
        
        <div className={cardStyle.priceIcon} >
            <span className="text text_type_digits-default mr-2">{item.price}</span>
            <CurrencyIcon />
        </div>
        <span className="text text_type_main-defaul mb-3">{item.name}</span>
      {visibleModal && (
        <Modal handleClose={handleCloseModal} header={header}>
          <IngredientDetails name={item.name} proteins={item.proteins} fat={item.fat} carbohydrates={item.carbohydrates} calories={item.calories} image={item.image_large}/>
        </Modal>
      )}
      </div>
  )
}

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired
}).isRequired
}

export default Card;