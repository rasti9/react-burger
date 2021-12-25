import React, {useCallback } from "react";
import {CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyle from "./CardIngredients.module.css";
import PropTypes from 'prop-types';
import { useLocation, Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setModalOpen} from "../../services/actions/ingredients.js";
import { useDrag } from "react-dnd";

const Card = (props) => {
 const {_id, item} = props;
 const location = useLocation();
 const dispatch = useDispatch();

 let counter = 0;
 const { countIngredients } = useSelector(state => state.ingredients);

 const oAddedIngredientInConstructor = countIngredients.find(x => x.id === _id);
 if (oAddedIngredientInConstructor) {
   counter = oAddedIngredientInConstructor.count;
 }

const handleOpenModal = useCallback((event, item) =>{
    dispatch(setModalOpen())
  }, [])

  const header = "Детали ингредиента";

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {_id}
  });

  return (  
    <Link
      key={_id}
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}
      className={cardStyle.link}
    >
    <div  ref={dragRef} className={cardStyle.card} onClick={(event) => handleOpenModal(event, item)} >
       {counter !== 0 && <div className={cardStyle.counterStyle}>
          <Counter count={counter} size="default" />
        </div> }
        <img src={item.image} alt={item.name} />
        
        <div className={cardStyle.priceIcon} >
            <span className="text text_type_digits-default mr-2">{item.price}</span>
            <CurrencyIcon />
        </div>
        <span className={cardStyle.fontStyle}>{item.name}</span>
      </div>
      </Link>
  )
}

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired
}).isRequired
}

export default Card;