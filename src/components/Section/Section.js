import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Card from "../CardIngredients/CardIngredients";
import sectionStyle from "./Section.module.css";
import {updateCurrentTab} from '../../services/actions/ingredients.js';
import PropTypes from 'prop-types';

const Section = (props) => {
  debugger;
const { id, ingredients} = props; // Получаем данные секции
const { ref, inView, entry } = useInView({
   // Массив процентов видимиости, при прохождении которых будет обновляться значение entry
  threshold: [0, 0.25, 0.5, 0.75, 1] })

const dispatch = useDispatch();

useEffect(() => {
  const ratio = entry ? entry.intersectionRatio : 0;
  dispatch(updateCurrentTab(id, ratio));
}, [inView, entry, dispatch]); // При изменении данных/скролле, обновляем ratio

return (
   ingredients.map((item) => (
    <li ref={ref} key={item._id}>
    <Card _id={item._id} item={item} key={item._id}/>
    </li>
   ))
);

}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
})).isRequired
}

export default Section;