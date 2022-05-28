import React, {useState} from 'react';
import styles from './Profile.module.scss';
import Breadcrumbs from "../../UI/Breadcrumbs";
import {useLocation, useNavigate} from "react-router-dom";

const Profile = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Профиль', path: "/profile"}
    ]);

    const navigationLinks = [
        {
            name: "settings",
            path: "/profile?module=settings",
            title: "Настройки"
        },
        {
            name: "order-history",
            path: "/profile?module=order-history",
            title: "История заказов"
        },
        {
            name: "product-add",
            path: "/profile?module=product-add",
            title: "Добавление товара"
        }
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>

            <div className={'box m-t-8'}>
                <div className={'row'}>
                    <div className={'col-4'}>
                        <h3 className={'m-t-0 m-b-8'}>Навигация</h3>
                        <ul className={styles['navigation']}>
                            {navigationLinks.map(({name, path, title}) => {
                                return(
                                    <li className={styles['navigation__item']}>
                                        <span onClick={() => navigate(path)}>{title}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={'col-8'}>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;