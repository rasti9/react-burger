import React, {useRef, useEffect} from "react";
import {useDispatch, Provider, useSelector } from 'react-redux';
import AppHeader from "../components/AppHeader/AppHeader";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from "./login.module.css";
import {URL} from '../constants/constants.js';
import {store} from '../services/store.js';
import { getUserInfo, resetPassword} from '../services/actions/auth.js';

const URL_RESET_PASSWORD = `${URL}/password-reset`;

export function ForgotPasswordPage() {
  return (
    <Provider store={store}> 
      <ForgotPassword /> 
    </Provider>
  )
}


export function ForgotPassword() {
    const input = useRef(null);
    const history = useHistory();
    const {isAuth, isPasswordReset} = useSelector(state => state.userInfo);
    let location = useLocation();
    const dispatch = useDispatch();

    useEffect(()=> {
      dispatch(getUserInfo(false));
      }, [])

    useEffect(() => {
        if (isAuth) {
            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);
        }
    }, [isAuth]);

    useEffect(() => {
      if (isPasswordReset) {
          history.replace("/reset-password");
      }
  }, [isPasswordReset]);


    const handleResetPassword = () => {
      const email = input.current.value;   
      if (email.length !== 0) {
      dispatch(resetPassword(email))
    //   fetch(URL_RESET_PASSWORD, {
    //     method: 'POST', 
    //     body: JSON.stringify({email: email}),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //  })
    //  .then(res => res.ok ? res : Promise.reject(res))
    //  .then(data => {
    //     history.replace("/reset-password");
    //   })    
    //  .catch( err => {
    //       console.log(err)
    //     })
    }
}

    return (
    <div>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <div className={loginStyle.marginTop}>
                <Input ref={input} type="email" placeholder="Укажите e-mail" ></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large" onClick={handleResetPassword}>Восстановить</Button>
            </div>
            <div className={loginStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'> Войти</Link>
                </p>
            </div>
        </div>
    </div>
    )
  }