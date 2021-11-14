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
    try {
      fetch(URL)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Ошибка:", error);
    }
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
