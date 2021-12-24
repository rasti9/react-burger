import React, {useState, useCallback, useContext} from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import {URL} from '../../constants/constants.js';
import { useDrop } from "react-dnd";
import {createOrder} from '../../services/actions/order.js';
import PropTypes from 'prop-types';


const BurgerConstructor = (props) => {
  const {handleDrop} = props;
  const history = useHistory();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      handleDrop(itemId);
    }
});

  const { ingredientsConstructor } = useSelector(state => state.ingredientsConstructor);
  
  const {isAuth} = useSelector(state => state.userInfo);

  const dispatch = useDispatch();
  
  const [visibleModal, setVisibleModal] = useState(false);

  const handleOpenModal = () => {
    if (isAuth) {
      const aIDs = [...ingredientsConstructor.map(x => x._id)];
      const oID = {
        "ingredients": aIDs
      };
      dispatch(createOrder(oID));
      setVisibleModal(true);
    } else {
      history.push("/login")
    }
  }

  const handleCloseModal = () =>{
    setVisibleModal(false);
  };


  return (
   
    <div ref={dropTarget} className={burgerStyle.container}>
     {ingredientsConstructor.length === 0 && <div className={burgerStyle.preliminaryText}>Пока Вы не добавили ни одного ингредиента. Для оформления заказа, выберите ингридиенты из списка</div>}
      {ingredientsConstructor && <Bun position="top"/>}
      <ul id="listConstructor" className={burgerStyle.scroll}>{ingredientsConstructor.filter(e => e.type !== "bun").map((item, index) => <BurgerConstructorListItem _id={item._id} customID={item.customID} key={item.customID} index={index} name={item.name} price={item.price} image={item.image}/>)}</ul>
     {ingredientsConstructor &&  <Bun position="bottom"/>}
        <div className={burgerStyle.footer}>
          <div className={burgerStyle.marginRight44}>
            <TotalSum />
            <CurrencyIcon />
          </div>
          <div >
            <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
            {visibleModal && 
            < Modal handleClose={handleCloseModal}>
            <OrderDetails />
            </Modal>}
          </div>
        </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  handleDrop: PropTypes.func.isRequired
};

export default BurgerConstructor;