import React, {useEffect} from "react";
import {useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from "./login.module.css";
import {login} from '../services/actions/auth.js';
import { getUserInfo} from '../services/actions/auth.js';


export function LoginPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const {isAuth} = useSelector(state => state.userInfo);
    const location = useLocation();

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

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

    const handleLogin = (e) => {
        e.preventDefault(true);
        dispatch(login(email, password)); 
    }


    return (
    <form onSubmit={handleLogin}>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Вход</p>
            <div className={loginStyle.marginTop}>
                <Input value={email} type="email" placeholder="E-mail" onChange={onChangeEmail}></Input>
            </div>
            <div className={loginStyle.marginTop}>
                <PasswordInput value={password} onChange={onChangePassword}></PasswordInput>
            </div>
            <div className={loginStyle.marginTop}>
                <Button type="primary" size="large">
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
    </form>
    )
  }