import React, {useEffect,useState} from "react";
import ingredientDetailsStyle from "./IngredientDetails.module.css";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function IngredientDetails() {
    const { ingredients } = useSelector(state => state.ingredients);  
    const [ingredient, setIngredient] = useState(undefined);

    const { ingredientId } = useParams()

    useEffect(() => {
        if (!ingredients) return;
        const currentIngredient = ingredients.find(x => x._id === ingredientId);
        setIngredient(currentIngredient);
    }, [ingredients, ingredientId ])

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
