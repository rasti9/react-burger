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
    const [email, setEmail] = React.useState('');
    const history = useHistory();
    const {isAuth, isPasswordReset} = useSelector(state => state.userInfo);
    let location = useLocation();
    const dispatch = useDispatch();

    const onChangeEmail= (e) => {
      setEmail(e.target.value);
  }

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


    const handleResetPassword = (e) => {
      e.preventDefault(true);
      dispatch(resetPassword(email))
    }

    return (
      <form onSubmit={handleResetPassword}>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <div className={loginStyle.marginTop}>
                <Input value={email} type="email" placeholder="Укажите e-mail" onChange={onChangeEmail} ></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large">Восстановить</Button>
            </div>
            <div className={loginStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'> Войти</Link>
                </p>
            </div>
        </div>
      </form>
    )
  }