import React from "react";
import orderStyle from "./OrderDetails.module.css";
import DoneGif from "../../images/done.gif";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

const OrderDetails = React.memo(() => {
  const { order } = useSelector(state => state.order);
  debugger;
    return (
        <div className={orderStyle.centerItems}>
          <p className="text text_type_digits-large">{order.number}</p>
          <p className="text text_type_main-medium mt-5">идентификатор заказа</p>
          <img src={DoneGif} className={orderStyle.marginTop60} alt="OK"/>
          <p className={"text text_type_main-default", orderStyle.marginTop60}>Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
  )
  })

export default OrderDetails;