import React, {useState, useCallback, useContext} from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { BurgerContext } from '../../services/burgerContext.js';
import {URL} from '../../constants/constants.js';

const URL_CREATE_ORDER = `${URL}/orders`;


const BurgerConstructor = () => {
  const data = useContext(BurgerContext);
  const [responseData, setResponseData] = useState(null);

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
      let response_data = await response.json();
      setResponseData(response_data);
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
      <Bun data={constructorData} position="top"/>
      <ul className={burgerStyle.scroll}>{constructorData.filter(e => e.type !== "bun").map((item, index) => <BurgerConstructorListItem key={index} name={item.name} price={item.price} image={item.image}/>)}</ul>
      <Bun data={constructorData} position="bottom"/>
        <div className={burgerStyle.footer}>
          <div className={burgerStyle.marginRight44}>
            <TotalSum data={constructorData}/>
            <CurrencyIcon />
          </div>
          <div >
            <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
            {visibleModal && 
            < Modal handleClose={handleCloseModal}>
            <OrderDetails data={responseData}/>
            </Modal>}
          </div>
        </div>
    </div>
  )
}

export default BurgerConstructor;