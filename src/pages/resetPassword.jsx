import React, {useRef, useEffect} from "react";
import {useDispatch, Provider, useSelector } from 'react-redux';
import AppHeader from "../components/AppHeader/AppHeader";
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from "./login.module.css";
import {URL} from '../constants/constants.js';
import {store} from '../services/store.js';
import { getUserInfo} from '../services/actions/auth.js';

const URL_RESET = `${URL}/password-reset/reset`;

export function ResetPasswordPage() {
    return (
      <Provider store={store}> 
        <ResetPassword /> 
      </Provider>
    )
  }
  

export function ResetPassword() {
    const history = useHistory();
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');

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

      const onChangePassword= (e) => {
        setPassword(e.target.value);
      }

      const onChangeCode = (e) => {
        setCode(e.target.value);
      }

      if (location.pathname === '/reset-password' && isPasswordReset === false) {
        return  <Redirect to={{pathname: '/login'}} />;
      }


    const handleResetPassword = () => {
        fetch(URL_RESET, {
          method: 'POST', 
          body: JSON.stringify({password: password, token: code}),
          headers: {
            'Content-Type': 'application/json'
          }
       })
       .then(res => res.ok ? res : Promise.reject(res))
       .then(data => {
          history.replace("/login");
        })    
       .catch( err => {
            console.log(err)
          })
    }

    return (
    <form onSubmit={handleResetPassword}>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <div className={loginStyle.marginTop}>
                <Input value={password} placeholder="Введите новый пароль" type="password" onChange={onChangePassword} ></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <Input value={code} placeholder="Введите код из письма" type="text" onChange={onChangeCode} ></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large" onClick={handleResetPassword}>Сохранить</Button>
            </div>
            <div className={loginStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'> Войти</Link>
                </p>
            </div>
        </div>
    </form>
    )
  }