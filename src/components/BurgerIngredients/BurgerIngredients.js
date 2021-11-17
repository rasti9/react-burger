import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyle from "./BurgerIngredients.module.css";
import PropTypes from 'prop-types';
import Card from "../CardIngredients/CardIngredients";

const BurgerIngredients = (props) => {
    const {data} = props;
    const [current, setCurrent] = React.useState('Bread')

    return (  
      <div>
        <div className={ingredientsStyle.displayFlex}>
          <Tab value="Bread" active={current === 'Bread'} onClick={setCurrent}>
          Булки 
          </Tab>
          <Tab value="Sauce" active={current === 'Sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="Fill" active={current === 'Fill'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={ingredientsStyle.heightScroll}>
          <h1 className="text text_type_main-medium mt-5">Булки</h1>
          <ul className={ingredientsStyle.list}>{data.filter(item => item.type === "bun").map((item) => <Card key={item._id} {...item} />)}</ul>
          <h1 className="text text_type_main-medium">Соусы</h1>
          <ul className={ingredientsStyle.list}>{data.filter(item => item.type === "sauce").map((item) => <Card key={item._id} {...item} />)}</ul>
          <h1 className="text text_type_main-medium">Начинки</h1>
          <ul className={ingredientsStyle.list}>{data.filter(item => item.type === "main").map((item) => <Card key={item._id} {...item} />)}</ul>
        </div>
      </div>
    )
  }

  BurgerIngredients.propTypes = {
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

export default BurgerIngredients;