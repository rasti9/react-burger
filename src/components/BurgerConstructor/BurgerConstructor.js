import React, {useState, useCallback, useContext} from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import {URL} from '../../constants/constants.js';
import { useDrop } from "react-dnd";
import {createOrder} from '../../services/actions/index.js';


const BurgerConstructor = (props) => {
  const {handleDrop} = props;

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      handleDrop(itemId);
    }
});

  const { ingredients_constructor } = useSelector(state => state.ingredientsConstructor);
  
  const [responseData, setResponseData] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  const firstBunElement = ingredients_constructor.find(x=> x.type === "bun");
  const constructorData = ingredients_constructor.filter(e => e.type !== "bun");
  const dispatch = useDispatch();

  if (firstBunElement) {
    constructorData.push(firstBunElement);
  }
   
  const handleOpenModal = useCallback(() => {
  const aIDs = constructorData.map(x => x._id);
  const oID = {
    "ingredients": aIDs
  };
    dispatch(createOrder(oID));
    setVisibleModal(true);
  })

  const handleCloseModal = useCallback(() =>{
    setVisibleModal(false);
  }, []);


  return (
    <div ref={dropTarget} className={burgerStyle.container}>
      {ingredients_constructor && <Bun position="top"/>}
      <ul  className={burgerStyle.scroll}>{ingredients_constructor.filter(e => e.type !== "bun").map((item, index) => <BurgerConstructorListItem _id={item._id} customID={item.customID} key={item.customID} index={index} name={item.name} price={item.price} image={item.image}/>)}</ul>
     {ingredients_constructor &&  <Bun position="bottom"/>}
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

export default BurgerConstructor;