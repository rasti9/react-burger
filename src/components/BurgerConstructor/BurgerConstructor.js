import React, {useState, useCallback} from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";
import OrderDetails from "../OrderDetails/OrderDetails";


const BurgerConstructor = (props) => {
  const {data} = props;
  const [visibleModal, setVisibleModal] = useState(false);
   
  const handleOpenModal = useCallback(() =>{
    setVisibleModal(true);
  }, [])

  const handleCloseModal = useCallback(() =>{
    setVisibleModal(false);
  }, [])

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
          <div >
            <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
            {visibleModal && <OrderDetails handleClose={handleCloseModal} />}
          </div>
        </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};


export default BurgerConstructor;