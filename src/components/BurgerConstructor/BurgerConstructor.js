import React, {useState, useCallback, useContext} from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { IngredientsContext } from '../../services/ingredientsContext.js';
import { ConstructorContext } from '../../services/constructorContext.js';
import { OrderContext } from '../../services/orderContext.js';

const URL_CREATE_ORDER = "https://norma.nomoreparties.space/api/orders";
let response_data;

const BurgerConstructor = () => {
  const data = useContext(IngredientsContext);

  const firstBunElement = data.find(x=> x.type === "bun");
  const constructorData = data.filter(e => e.type !== "bun")
  constructorData.push(firstBunElement);

  const [visibleModal, setVisibleModal] = useState(false);
   
  const handleOpenModal = useCallback(() =>{
  const aIDs = constructorData.map(x => x._id);
  const oID = {
    "ingredients": aIDs
  };

  const createOrder = async () => {
    try {
      const response = await fetch(URL_CREATE_ORDER, {
        method: 'POST', 
        body: JSON.stringify(oID),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      response_data = await response.json();
      setVisibleModal(true);

    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
    createOrder();
  }, [])

  const handleCloseModal = useCallback(() =>{
    setVisibleModal(false);
  }, [])

  return (
    <div>
      <ConstructorContext.Provider value={constructorData}>
      <Bun position="top"/>
      <ul className={burgerStyle.scroll}>{constructorData.filter(e => e.type !== "bun").map((item, index) => <BurgerConstructorListItem key={index} name={item.name} price={item.price} image={item.image}/>)}</ul>
      <Bun position="bottom"/>
        <div className={burgerStyle.footer}>
          <div className={burgerStyle.marginRight44}>
            <TotalSum />
            <CurrencyIcon />
          </div>
          <div >
            <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
            {visibleModal && 
            < Modal handleClose={handleCloseModal}>
            <OrderContext.Provider value={response_data}>
            <OrderDetails/>
            </OrderContext.Provider>
            </Modal>}
          </div>
        </div>
        </ConstructorContext.Provider>
    </div>
  )
}

export default BurgerConstructor;