import React from "react";
import {CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from "./CardIngredients.module.css";
import PropTypes from 'prop-types';

const Card = (props) => {
 const {image, name, price} = props;
  return (  
    <li className={cardStyle.card}>
        <img src={image} alt={name}/>
        <div className={cardStyle.priceIcon} >
            <span className="text text_type_digits-default mr-2">{price}</span>
            <CurrencyIcon />
        </div>
        <span className="text text_type_main-defaul mb-3">{name}</span>
    </li>
  )
}

Card.propTypes = {
    img: PropTypes.string,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  };


export default Card;