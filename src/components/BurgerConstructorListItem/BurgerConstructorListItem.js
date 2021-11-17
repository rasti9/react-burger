import React from "react";
import burgerListItemStyle from "./BurgerConstructorListItem.module.css";
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructorListItem = (props) => {
  const {name, price, image} = props;

  return (
    <div className={burgerListItemStyle.listItem}>
        <DragIcon />
        <li className="ml-2 mb-3">
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}/>
        </li>
    </div>
  )
}

BurgerConstructorListItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default BurgerConstructorListItem;