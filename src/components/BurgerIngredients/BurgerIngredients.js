import React, {useContext} from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyle from "./BurgerIngredients.module.css";
import Card from "../CardIngredients/CardIngredients";
import { BurgerContext } from '../../services/burgerContext.js';

const BurgerIngredients = () => {
    const data = useContext(BurgerContext);
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


export default BurgerIngredients;