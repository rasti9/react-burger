import React, {useEffect,useState} from "react";
import ingredientDetailsStyle from "./IngredientDetails.module.css";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function IngredientDetails() {
    const { ingredients } = useSelector(state => state.ingredients);
    let {currentIngredient} = useSelector(state => state.currentIngredient);
    const [ingredient, setIngredient] = useState(currentIngredient);
    const location = useLocation();

    useEffect(() => {
    if (Object.keys(currentIngredient).length === 0 && location.pathname.includes("/ingredients/")) {
        const ingredientID = location.pathname.split("/")[2];
        currentIngredient = ingredients.find(x => x._id === ingredientID);
        setIngredient(currentIngredient);
    }
    }, [ingredients])

    if (ingredient === undefined) {
        return <>
                <p className={ingredientDetailsStyle.loading}>Загрузка..</p>
            </>;
      }

    return (
        <div className={ingredientDetailsStyle.centerColumnItems}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <p className="text text_type_main-medium mt-4">{ingredient.name}</p>
            <div className={ingredientDetailsStyle.rowItems}>
                <div className={ingredientDetailsStyle.columnItems}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{ingredient.calories}</p>
                </div>
                <div className={ingredientDetailsStyle.columnItems}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{ingredient.proteins}</p>
                </div>
                <div className={ingredientDetailsStyle.columnItems}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{ingredient.fat}</p>
                </div>
                <div className={ingredientDetailsStyle.columnItems}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive mt-2">{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
        )
  }
