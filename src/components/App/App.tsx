import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import data from "../../utils/data.json";
import appStyle from "./App.module.css";

function App() {
  return (
    <div>
      <header>
        <nav>
          <AppHeader />
        </nav>
      </header>
      <main className={appStyle.mainStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>Соберите бургер</h1>
          <section
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
