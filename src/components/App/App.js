import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import appStyle from "./App.module.css";
import { BurgerContext } from '../../services/burgerContext.js';
import {URL} from '../../constants/constants.js';

const URL_INGREDIENTS = `${URL}/ingredients`;

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getIngredients = async () => {
        try {
        const response = await fetch(URL_INGREDIENTS);
        if (!response.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const data = await response.json();
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
    getIngredients();
  }, []);

  return (
     !isLoading && 
      <div>
       <BurgerContext.Provider value={data} >
        <AppHeader />
        <main className={appStyle.mainStyle}>
          <div className={appStyle.columnStyle}>
            <h1>Соберите бургер</h1>
            <section className={appStyle.rowStyle}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </section>
          </div>
        </main>
        </BurgerContext.Provider>
      </div>
    ) 
}

export default App;
