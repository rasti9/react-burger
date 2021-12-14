import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Card from "../CardIngredients/CardIngredients";
import sectionStyle from "./Section.module.css";
import {updateCurrentTab} from '../../services/actions/index.js';

const Section = (props) => {
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

export default Section;