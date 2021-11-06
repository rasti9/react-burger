import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import data from "./utils/data.json";

function App() {
  return (
    <div>
      <header>
        <nav>
          <AppHeader />
        </nav>
      </header>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
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
