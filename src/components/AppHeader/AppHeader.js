import React from "react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink} from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from "./AppHeader.module.css";

function AppHeader() {
    return ( 
        <header>
        <nav>
        <div className={headerStyle.header}  >
            <div className={headerStyle.styleIconBurger} >
                <BurgerIcon type="primary"  />
                <NavLink to='/' exact className={headerStyle.linkStyle} activeClassName={headerStyle.activeLink} >Конструктор</NavLink>
            </div>
            <div className={headerStyle.styleIcon15}>
                <ListIcon  type="secondary" />
                <span className="text text_type_main-default text_color_inactive ml-2" > Лента заказов</span>
            </div>
            <div className={headerStyle.logo}>
                <Logo />
            </div>
            <div className={headerStyle.styleIcon} >
                <ProfileIcon type="secondary" />
                <NavLink to='/profile' className={headerStyle.linkStyle} activeClassName={headerStyle.activeLink} >Личный кабинет</NavLink>
            </div>
        </div>   
        </nav>
      </header>
    );
  }


export default AppHeader;