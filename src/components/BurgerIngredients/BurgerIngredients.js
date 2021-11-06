import React from "react";
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyle from "./BurgerIngredients.module.css";
import PropTypes from 'prop-types';


const Card = (props) => {
  return (  
    <li className={ingredientsStyle.card}>
        <img src={props.img}/>
        <div className={ingredientsStyle.priceIcon} >
        <span className="text text_type_digits-default mr-2">{props.price}</span>
        <CurrencyIcon />
        </div>
        <span className="text text_type_main-defaul mb-3">{props.name}</span>
      </li>
  )
}

const ListCards = (props) => {
    let listType = props.type;
    let aItems = props.data;
    let aList= [];

    aItems.filter(item => item.type === props.type).forEach(function(item) {
      aList.push(<Card id={item._id} img={item.image} price= {item.price} name={item.name}/>)
    })
  return  <ul className={ingredientsStyle.list}>{aList}</ul>
}

const BurgerIngredients = (props) => {
    const [current, setCurrent] = React.useState('Bread')
    let aItems = props.data;

    BurgerIngredients.propTypes = {
      arrayItems: PropTypes.array
    };

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
      <ListCards data={aItems} type="bun"/>
      <h1 className="text text_type_main-medium">Соусы</h1>
      <ListCards data={aItems} type="sauce"/>
      <h1 className="text text_type_main-medium">Начинки</h1>
      <ListCards data={aItems} type="main"/>
      </div>
      </div>
    )
  }


export default BurgerIngredients;