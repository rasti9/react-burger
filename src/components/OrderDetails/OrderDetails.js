import React from "react";
import orderStyle from "./OrderDetails.module.css";
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import DoneGif from "../../images/done.gif";
import PropTypes from 'prop-types';
 
const OrderDetails = React.memo((props) => {
   const {handleClose} = props;
     return (
        <div className={orderStyle.modal} >
          <div className={orderStyle.header}>
            <CloseIcon onClick={handleClose}/>
          </div>
          <div className={orderStyle.centerItems}>
            <p className="text text_type_digits-large">034535</p>
            <p className="text text_type_main-medium mt-5">идентификатор заказа</p>
            <img src={DoneGif} className={orderStyle.marginTop60} alt="OK"/>
            <p className={"text text_type_main-default", orderStyle.marginTop60}>Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
          </div>
        </div>
    )
  })

  OrderDetails.propTypes = {
    handleClose: PropTypes.func.isRequired
  };


export default OrderDetails;