import React from "react";
import PropTypes from 'prop-types';

const TotalSum = (props) => {
  let totalSum = 0;
  props.data.forEach(function(item) {
    totalSum += item.price
  })
  return <span className="text text_type_digits-medium">{totalSum}</span>;
}

TotalSum.propTypes = {
    data: PropTypes.array.isRequired
  };

export default TotalSum;