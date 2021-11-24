import React, {useContext} from "react";
import PropTypes from 'prop-types';
import { ConstructorContext } from '../../services/constructorContext.js';

const TotalSum = () => {
  const data = useContext(ConstructorContext);
  let totalSum = 0;
  data.forEach(function(item) {
    totalSum += item.price
  })
  return <span className="text text_type_digits-medium">{totalSum}</span>;
}

export default TotalSum;