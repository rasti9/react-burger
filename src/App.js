import React, {useState,useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage }  from './pages';
import { ProtectedRoute } from './components/ProtectedRoute';
import AppHeader from "./components/AppHeader/AppHeader";
import IngredientDetails from "./components/IngredientDetails/IngredientDetails";
import Modal from "./components/Modal/Modal";


export default function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;
    const [visibleModal, setVisibleModal] = useState(false);

    const handleModalClose = () => {
      setVisibleModal(false);
      history.goBack();
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
              visibleModal && <Modal onClose={handleModalClose}>
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