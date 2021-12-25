import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage }  from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute';
import AppHeader from "../AppHeader/AppHeader";
import appStyle from "./App.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getIngredients, setModalClose } from '../../services/actions/ingredients.js';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;
    const dispatch = useDispatch();
    const { isModalOpen } = useSelector(state => state.currentIngredient);
    
    useEffect(()=> {
      dispatch(getIngredients())
    }, [])


    const handleModalClose = () => {
      history.goBack();
      dispatch(setModalClose());
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
              isModalOpen && <Modal header="Детали ингредиента" handleClose={handleModalClose}>
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