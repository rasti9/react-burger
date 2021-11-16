import React, {useState, useCallback} from "react";
import burgerStyle from "./BurgerConstructor.module.css";
import { Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import TotalSum from "../TotalSum/TotalSum";
import Bun from "../Bun/Bun";
import BurgerConstructorListItem from "../BurgerConstructorListItem/BurgerConstructorListItem";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";


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
      <Bun data={data} position="top"/>
      <ul className={burgerStyle.scroll}>{data.map((item, index) => <BurgerConstructorListItem key={index} name={item.name} price={item.price} image={item.image}/>)}</ul>
      <Bun data={data} position="bottom"/>
        <div className={burgerStyle.footer}>
          <div className={burgerStyle.marginRight44}>
            <TotalSum data={data} />
            <CurrencyIcon />
          </div>
          <div >
            <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
            {visibleModal && < Modal handleClose={handleCloseModal}><OrderDetails/></Modal>}
          </div>
        </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
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


export default BurgerConstructor;