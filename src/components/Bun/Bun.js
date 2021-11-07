import React from "react";
import bunStyle from "./Bun.module.css";
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


const Bun = (props) => {
  const bunElement = props.data.find(item => item.type === "bun");
  let text = bunElement.name + " (верх)";

  if (props.position === "bottom") {
    text = bunElement.name + " (вниз)"
  } 

  return (
    <div className={bunStyle.addSpaceFirstAndLastItem}>
      <ConstructorElement
        type = {props.position}
        text={text} 
        price={bunElement.price}
        thumbnail={bunElement.image}
        isLocked = {true}
      />
    </div>); 
}


Bun.propTypes = {
    data: PropTypes.array.isRequired
  };

export default Bun;