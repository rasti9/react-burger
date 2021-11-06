import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from "./AppHeader.module.css";

function AppHeader() {
    return ( 
        <div className={headerStyle.header}  >
            <div className={headerStyle.styleIcon} >
            <BurgerIcon type="primary"  />
            <span className="text text_type_main-default ml-2">Конструктор</span>
            </div>
            <div className={headerStyle.styleIcon15}>
            <ListIcon  type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2" > Лента заказов</span>
            </div>
            <div className={headerStyle.logo}>
            <Logo  ></Logo>
            </div>
            <div className={headerStyle.styleIcon} >
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2" >Личный кабинет</span>
            </div>
        </div>
       
    );
  }


export default AppHeader;