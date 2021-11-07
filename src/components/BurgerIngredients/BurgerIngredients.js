import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyle from "./BurgerIngredients.module.css";
import PropTypes from 'prop-types';
import ListCards from "../ListCardIngredients/ListCardIngredients";

const BurgerIngredients = (props) => {
    const {data} = props;
    const [current, setCurrent] = React.useState('Bread')

    return (  
      <div>
        <div style={{ display: 'flex' }}>
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
          <ListCards data={data} type="bun"/>
          <h1 className="text text_type_main-medium">Соусы</h1>
          <ListCards data={data} type="sauce"/>
          <h1 className="text text_type_main-medium">Начинки</h1>
          <ListCards data={data} type="main"/>
        </div>
      </div>
    )
  }

  BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired
  };

export default BurgerIngredients;