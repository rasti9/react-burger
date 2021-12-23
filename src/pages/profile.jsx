import React, {useEffect, useRef, useState} from "react";
import { useSelector, useDispatch, Provider } from 'react-redux';
import AppHeader from "../components/AppHeader/AppHeader";
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyle from "./profile.module.css";
import { getUserInfo, saveUserInfo, logOut} from '../services/actions/auth.js';
import {store} from '../services/store.js';

export function ProfilePage() {
    return (
      <Provider store={store}> 
        <Profile /> 
      </Provider>
    )
  }

function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userNameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const {user} = useSelector(state => state.userInfo);
    const {isLoggedOut} = useSelector(state => state.userInfo);
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    
    useEffect(() => {
        setUserName(user.name); 
    }, [user.name]);

    useEffect(() => {
        setUserEmail(user.email); 
    }, [user.email]);

    useEffect(() => {
        if (isLoggedOut) {
            history.replace("/login");
        }
    }, [isLoggedOut]);

    const handleChangeInput = e => {
        setUserName(e.target.value)
    }

    const handleChangeEmail = e => {
        setUserEmail(e.target.value)
    }

    const handleSave = () => {
        dispatch(saveUserInfo(userNameRef.current.value, emailRef.current.value, false));
    }

    const handleCancel = () => {
        setUserName(user.name); 
        setUserEmail(user.email); 
    }

    const handleSignOut = () => {
        dispatch(logOut());
    }

 
    return (
    <div>
        <div className={profileStyle.rowStyle}>
            <div className={profileStyle.linkBlockStyle}>
                <div className={profileStyle.marginTop}>
                    <NavLink to='/profile' className={profileStyle.linkStyle} activeClassName={profileStyle.activeLink} >Профиль</NavLink>
                </div>
                <div className={profileStyle.marginTop}>
                    <NavLink to='/profile/orders' className={profileStyle.linkStyle}>История заказов</NavLink>
                </div>
                <div className={profileStyle.marginTop}>
                    <Link onClick={handleSignOut} className={profileStyle.linkStyle}>Выход</Link>
                </div>
                <div className={profileStyle.marginTop80}>
                <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            </div>
            <div className={profileStyle.contentStyle}>
                <div className={profileStyle.marginTop}>
                    <Input type="text" placeholder="Имя" ref={userNameRef} value={userName} onChange={handleChangeInput} icon={'EditIcon'} ></Input>
                </div>
                <div className={profileStyle.marginTop}>
                    <Input type="email" placeholder="Логин" ref={emailRef} value={userEmail} onChange={handleChangeEmail}  icon={'EditIcon'}></Input>
                </div>
                <div className={profileStyle.marginTop}>
                    <Input type="password" placeholder="Пароль" icon={'EditIcon'}></Input>
                </div>
                <div className={profileStyle.buttonsStyle}>
                <Button type="secondary" size="medium" onClick={handleCancel} >
                 Отмена
                </Button>
                <Button type="primary" size="medium" onClick={handleSave}>
                 Сохранить
                </Button>
                </div>
            </div> 
        </div>
    </div>
        
    )
  }