import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import appStyle from "./App.module.css";

const URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getIngredients = async () => {
        try {
        const response = await fetch(URL);
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
        <AppHeader />
        <main className={appStyle.mainStyle}>
          <div className={appStyle.columnStyle}>
            <h1>Соберите бургер</h1>
            <section className={appStyle.rowStyle}>
              <BurgerIngredients data={data} />
              <BurgerConstructor data={data} />
            </section>
          </div>
        </main>
      </div>
    ) 
}

export default App;
