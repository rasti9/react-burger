import React from "react";
import PropTypes from 'prop-types';

const TotalSum = (props) => {
  const {data} = props;
  let totalSum = 0;
  data.forEach(function(item) {
    totalSum += item.price
  })
  return <span className="text text_type_digits-medium">{totalSum}</span>;
}

TotalSum.propTypes = {
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
    })).isRequired
  };

export default TotalSum;