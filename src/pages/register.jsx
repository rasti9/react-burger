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
    const dispatch = useDispatch();

    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

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
    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleRegister = (e) => {
        e.preventDefault(true);   
        fetch(URL_REGISTER_USER, {
            method: 'POST', 
            body: JSON.stringify({name:name, email: email, password: password}),
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

    return (
    <form onSubmit={handleRegister}>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Регистрация</p>
            <div className={loginStyle.marginTop}>
                <Input value={name} type="text" placeholder="Имя" onChange={onChangeName}></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <Input value={email} type="email" placeholder="E-mail" onChange={onChangeEmail}></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <PasswordInput value={password} onChange={onChangePassword}></PasswordInput>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large">Зарегистрироваться</Button>
            </div>
            <div className={loginStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'> Войти</Link>
                </p>
            </div>
        </div>
    </form>
    )
  }