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
  }, [])


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
      {visibleModal && <Modal handleClose={handleCloseModal}>
      <IngredientDetails name={name} proteins={desc.proteins} fat={desc.fat} carbohydrates={desc.carbohydrates} calories={desc.calories} image={desc.image_large} handleClose={handleCloseModal} />
      </Modal>}
      </div>
  )
}

Card.propTypes = {
    img: PropTypes.string,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.object
  };


export default Card;