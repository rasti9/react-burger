import React, {useContext} from "react";
import bunStyle from "./Bun.module.css";
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ConstructorContext } from '../../services/constructorContext.js';

const Bun = (props) => {
  const {position} = props;
  const data = useContext(ConstructorContext);

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
    position: PropTypes.string.isRequired
  };

export default Bun;