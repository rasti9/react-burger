import React from "react";
import orderStyle from "./OrderDetails.module.css";
import DoneGif from "../../images/done.gif";
import PropTypes from 'prop-types';
 
const OrderDetails = React.memo((props) => {
  const {data} = props;
    return (
        <div className={orderStyle.centerItems}>
          <p className="text text_type_digits-large">{data.order.number}</p>
          <p className="text text_type_main-medium mt-5">идентификатор заказа</p>
          <img src={DoneGif} className={orderStyle.marginTop60} alt="OK"/>
          <p className={"text text_type_main-default", orderStyle.marginTop60}>Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
  )
  })

  OrderDetails.propTypes = {
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      order: PropTypes.object.isRequired,
      success: PropTypes.string.isRequired,
    }).isRequired
  };

export default OrderDetails;