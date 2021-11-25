import React from "react";
import bunStyle from "./Bun.module.css";
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Bun = (props) => {
  const {data, position} = props;

  const bunElement = data.find(item => item.type === "bun");
  let text = bunElement.name + " (верх)";

  if (position === "bottom") {
    text = bunElement.name + " (низ)"
  } 

  return (
    <div className={bunStyle.addSpaceFirstAndLastItem}>
      <ConstructorElement
        type = {position}
        text={text} 
        price={bunElement.price}
        thumbnail={bunElement.image}
        isLocked = {true}
      />
    </div>); 
}


Bun.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
     _id : PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     type: PropTypes.string.isRequired,
     proteins: PropTypes.number.isRequired,
     fat: PropTypes.number.isRequired,
     carbohydrates: PropTypes.number.isRequired,
     calories: PropTypes.number.isRequired,
     price: PropTypes.number.isRequired,
     image: PropTypes.string.isRequired,
     image_mobile: PropTypes.string.isRequired,
     image_large: PropTypes.string.isRequired
  })).isRequired,
  position: PropTypes.string.isRequired
};

export default Bun;