import React, {useRef, useEffect} from "react";
import {useDispatch, Provider, useSelector } from 'react-redux';
import AppHeader from "../components/AppHeader/AppHeader";
import { Link, useHistory, useLocation} from 'react-router-dom';
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from "./login.module.css";
import {URL} from '../constants/constants.js';
import {store} from '../services/store.js';
import { getUserInfo} from '../services/actions/auth.js';

const URL_REGISTER_USER = `${URL}/auth/register`;

export function RegisterPage() {
    return (
      <Provider store={store}> 
        <Register /> 
      </Provider>
    )
  }

export function Register() {
    const history = useHistory();
    const name = useRef(null);
    const email = useRef(null);
    const dispatch = useDispatch();

    const [password, setPassword] = React.useState('');
    const {isAuth} = useSelector(state => state.userInfo);
    let location = useLocation();

    useEffect(()=> {
        dispatch(getUserInfo(false));
        }, [])

    useEffect(() => {
        if (isAuth) {
            let { from } = location.state || { from: { pathname: "/" } };
            history.replace(from);
        }
    }, [isAuth]);

 
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = () => {
        let nameValue = name.current.value;   
        let emailValue = email.current.value;     

        if (nameValue.length !== 0 && emailValue.length !== 0 && password.length !== 0) {
            fetch(URL_REGISTER_USER, {
              method: 'POST', 
              body: JSON.stringify({name:nameValue, email: emailValue, password: password}),
              headers: {
                'Content-Type': 'application/json'
              }
           })
           .then(res => res.ok ? res : Promise.reject(res))
           .then(data => {
              history.replace("/");
            })    
           .catch( err => {
                console.log(err)
              })
          }
    }

    return (
    <div>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Регистрация</p>
            <div className={loginStyle.marginTop}>
                <Input type="text" placeholder="Имя" ref={name} ></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <Input type="email" placeholder="E-mail" ref={email} ></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <PasswordInput value={password} onChange={onChangePassword}></PasswordInput>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large" onClick={handleRegister}>Зарегистрироваться</Button>
            </div>
            <div className={loginStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'> Войти</Link>
                </p>
            </div>
        </div>
    </div>
    )
  }