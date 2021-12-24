import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage }  from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute';
import AppHeader from "../AppHeader/AppHeader";
import appStyle from "./App.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getIngredients } from '../../services/actions/ingredients.js';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {store} from '../../services/store.js';

export default function AppWrapper() {
  return (
    <Provider store={store}> 
      <App /> 
    </Provider>
  )
}

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;
    const [visibleModal, setVisibleModal] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=> {
      // Отправляем экшен-функцию
      dispatch(getIngredients())
    }, [dispatch])


    const handleModalClose = () => {
      setVisibleModal(false);
    };

  return ( 
    <>
    <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <MainPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/ingredients/:ingredientId' exact>
            <div className={appStyle.headerText}>
              <p className="text text_type_main-large">Детали ингредиента</p>
            </div>
            <IngredientDetails />
          </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {background && (
          <Route
            path='/ingredients/:ingredientId'
            children={
              visibleModal && <Modal header="Детали ингредиента" handleClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
      </>
  )
}
      return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}