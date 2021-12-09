import React from "react";
import { useSelector } from 'react-redux';

const TotalSum = () => {
  const { ingredientsConstructor } = useSelector(state => state.ingredientsConstructor);
  let totalSum = 0;
  ingredientsConstructor.forEach(function(item) {
    totalSum += item.price
  })
  
  return <span className="text text_type_digits-medium">{totalSum}</span>;
}

export default TotalSum;