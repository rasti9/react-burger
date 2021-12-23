import React from "react";
import AppHeader from "../components/AppHeader/AppHeader";
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyle from "./login.module.css";

export function NotFoundPage() {
    return (
    <div>
        <div className={loginStyle.loginStyle}>
            <p className="text text_type_main-medium">Страница не найдена. Ошибка 404</p>
        </div>
    </div>
    )
  }