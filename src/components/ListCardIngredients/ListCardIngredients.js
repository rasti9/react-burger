import React from "react";
import listCardStyle from "./ListCardIngredients.module.css";
import PropTypes from 'prop-types';
import Card from "../CardIngredients/CardIngredients";

const ListCards = (props) => {
    const {data} = props;
    const aList= [];

    data.filter(item => item.type === props.type).forEach(function(item) {
      aList.push(<Card key={item._id} image={item.image} price={item.price} name={item.name}/>)
    })

  return  <ul className={listCardStyle.list}>{aList}</ul>
}


ListCards.propTypes = {
    data: PropTypes.array.isRequired
  };

export default ListCards;