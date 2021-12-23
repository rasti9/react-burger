import React, {useRef, useEffect} from "react";
import {useDispatch, Provider, useSelector } from 'react-redux';
import AppHeader from "../components/AppHeader/AppHeader";
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from "./login.module.css";
import {login} from '../services/actions/auth.js';
import {store} from '../services/store.js';
import { getUserInfo} from '../services/actions/auth.js';

export function LoginPage() {
    return (
      <Provider store={store}> 
        <Login /> 
      </Provider>
    )
  }
  

function Login() {
    const history = useHistory();
    const email = useRef(null);
    const dispatch = useDispatch();
    const [password, setPassword] = React.useState('');
    const {isAuth} = useSelector(state => state.userInfo);
    const location = useLocation();

    const onChangePassword = (e) => {
        setPassword(e.target.value);
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

    const handleLogin = () => {
        if (email.current.value.length !== 0 && password.length !== 0) {
            dispatch(login(email.current.value, password));
        } 
    }


    return (
    <div>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Вход</p>
            <div className={loginStyle.marginTop}>
                <Input type="email" placeholder="E-mail" ref={email}></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <PasswordInput value={password} onChange={onChangePassword}></PasswordInput>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large" onClick={handleLogin}>
                Войти
                </Button>
            </div>
            <div className={loginStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <Link to='/register'> Зарегистрироваться</Link>
                </p>
            </div>
            <div className={loginStyle.marginTop18}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password'> Восстановить пароль</Link>
                </p>
            </div>
        </div>
    </div>
    )
  }