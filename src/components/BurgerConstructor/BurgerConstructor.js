import React from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const CreateOrderButton = () => {
  return <Button type="primary" size="large">Оформить заказ</Button>
}

const TotalSum = (props) => {
  let totalSum = 0;
  props.data.forEach(function(item) {
    totalSum += item.price
  })
  return <span className="text text_type_digits-medium">{totalSum}</span>;
}

const BurgerConstructor = (props) => {
  let list = [];
  let aItems = props.data;

  props.data.forEach(function(item, index) {
    if (index === 0 || index === aItems.length -1) {
      let typeElement = "top";
      if (index === aItems.length -1) {
        typeElement = "bottom";
      }
      list.push(<li key={item._id} className={burgerStyle.addSpaceFirstAndLastItem}>
      <ConstructorElement
        type = {typeElement}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      /></li>);
    } else {
      list.push(<div className={burgerStyle.listItem}>
      <DragIcon />
      <li key={item._id} className="ml-2 mb-3">
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      /></li>
      </div>);
    } 
  })

  BurgerConstructor.propTypes = {
    aItems: PropTypes.array
  };

  return (
    <div>
    <ul className={burgerStyle.scroll}>{list} </ul>
    <div className={burgerStyle.footer}>
      <div className={burgerStyle.marginRight44}>
     <TotalSum data={props.data} />
     <CurrencyIcon />
     </div>
    <CreateOrderButton />
    </div>
    </div>
  )

}

  


export default BurgerConstructor;