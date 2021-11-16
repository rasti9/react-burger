import React, {useState,useCallback } from "react";
import {CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from "./CardIngredients.module.css";
import PropTypes from 'prop-types';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

const Card = (props) => {
 const {image, name, price, ...desc} = props;
 const [visibleModal, setVisibleModal] = useState(false);
   
  const handleOpenModal = useCallback(() =>{
    setVisibleModal(true);
  }, [])

  const handleCloseModal = useCallback(() =>{
    setVisibleModal(false);
  }, []);

  const header = "Детали ингредиента";

  return (  
    <div>
    <li className={cardStyle.card} onClick={handleOpenModal}>
        <img src={image} alt={name}/>
        <div className={cardStyle.priceIcon} >
            <span className="text text_type_digits-default mr-2">{price}</span>
            <CurrencyIcon />
        </div>
        <span className="text text_type_main-defaul mb-3">{name}</span>
    </li>
      {visibleModal && <Modal handleClose={handleCloseModal} header={header}>
      <IngredientDetails name={name} proteins={desc.proteins} fat={desc.fat} carbohydrates={desc.carbohydrates} calories={desc.calories} image={desc.image_large}/>
      </Modal>}
      </div>
  )
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.shape({
      _id : PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired
   })
  };


export default Card;