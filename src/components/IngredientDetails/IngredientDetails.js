import React from "react";
import ingredientDetailsStyle from "./IngredientDetails.module.css";
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
 
const IngredientDetails = React.memo((props) => {
    const {name, proteins, fat, carbohydrates, calories, image, handleClose} = props;
     return (
        <div className={ingredientDetailsStyle.modal}>
            <div className={ingredientDetailsStyle.header}>
                <p className="text text_type_main-large">Детали ингредиента</p>
                <CloseIcon onClick={handleClose}/>
            </div>
            <div className={ingredientDetailsStyle.centerColumnItems}>
                <img src={image} alt={name}/>
                <p className="text text_type_main-medium mt-4">{name}</p>
                <div className={ingredientDetailsStyle.rowItems}>
                    <div className={ingredientDetailsStyle.columnItems}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive mt-2">{calories}</p>
                    </div>
                    <div className={ingredientDetailsStyle.columnItems}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive mt-2">{proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyle.columnItems}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive mt-2">{fat}</p>
                    </div>
                    <div className={ingredientDetailsStyle.columnItems}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive mt-2">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    )
  })

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image: PropTypes.string,
    handleClose: PropTypes.func.isRequired
  };

export default IngredientDetails;