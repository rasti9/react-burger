import React from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

const TotalSum = () => {
  const { ingredients_constructor } = useSelector(state => state.ingredientsConstructor);
  let totalSum = 0;
  ingredients_constructor.forEach(function(item) {
    totalSum += item.price
  })
  
  return <span className="text text_type_digits-medium">{totalSum}</span>;
}

export default TotalSum;