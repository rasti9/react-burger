import React from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";

const BurgerConstructor = (props) => {
  const {data} = props;

  return (
    <div>
      <Bun data={props.data} position="top"/>
      <ul className={burgerStyle.scroll}>{data.map(item => <BurgerConstructorListItem key={item._id} name={item.name} price={item.price} image={item.image}/>)}</ul>
      <Bun data={props.data} position="bottom"/>
        <div className={burgerStyle.footer}>
          <div className={burgerStyle.marginRight44}>
            <TotalSum data={props.data} />
            <CurrencyIcon />
          </div>
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};


export default BurgerConstructor;