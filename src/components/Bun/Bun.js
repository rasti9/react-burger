import React from "react";
import bunStyle from "./Bun.module.css";
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

const Bun = (props) => {
  const { ingredientsConstructor } = useSelector(state => state.ingredientsConstructor);
  const {position} = props;
  let text = "";

  if (ingredientsConstructor.length !== 0) {
  const bunElement = ingredientsConstructor.find(item => item.type === "bun");

  if (bunElement) {
      text = bunElement.name + " (верх)";
    if (position === "bottom") {
      text = bunElement.name + " (низ)"
    } 
  }   

  return (
     <div className={bunStyle.addSpaceFirstAndLastItem}>
     {bunElement && <ConstructorElement
        type = {position}
        text={text} 
        price={bunElement.price}
        thumbnail={bunElement.image}
        isLocked = {true}
      />}
    </div>) ; 
  } else {
      return <div></div >;
  }
}


Bun.propTypes = {
  position: PropTypes.string.isRequired
};

export default Bun;