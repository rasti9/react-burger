import React, {useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyle from "./BurgerIngredients.module.css";
import Card from "../CardIngredients/CardIngredients";
//import { BurgerContext } from '../../services/burgerContext.js';
import { getIngredients } from '../../services/actions/index.js';
import { useInView } from 'react-intersection-observer';
import Section from "../Section/Section.js";


const BurgerIngredients = () => {
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
    const {tabs} = useSelector(state => state.tabs);

    // Получаем метод dispatch
    const dispatch = useDispatch();

    useEffect(()=> {
      // Отправляем экшен-функцию
      dispatch(getIngredients())
    }, [dispatch])

    const currentTab = tabs.reduce((current, tab) => {
      return current.ratio < tab.ratio ? tab : current
    }, tabs[0]).id;


    if (ingredientsFailed) {
      return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
      return <p>Загрузка...</p>
    } else if (ingredients) {

    return (  
      <div>
        <div className={ingredientsStyle.displayFlex}>
          {tabs.map(({ id, title }) => (
              <Tab key={id} value={id} active={currentTab === id}>
                {title}
              </Tab>
            ))}
        </div>
        <div className={ingredientsStyle.heightScroll}>
          <h1 className="text text_type_main-medium mt-5">Булки</h1>
          <ul className={ingredientsStyle.list}><Section id="bun" ingredients={ingredients.filter(item => item.type === "bun")} /> </ul>
          <h1 className="text text_type_main-medium">Соусы</h1>
          <ul className={ingredientsStyle.list}><Section id="sauce" ingredients={ingredients.filter(item => item.type === "sauce")} /></ul>
          <h1 className="text text_type_main-medium">Начинки</h1>
          <ul className={ingredientsStyle.list}><Section id="fill" ingredients={ingredients.filter(item => item.type === "main")} /></ul>
        </div>
      </div>
    )
  } else {
    return <p>API error</p>
  }

  }


export default BurgerIngredients;