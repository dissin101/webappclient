import React, {useEffect, useState} from 'react';
import styles from './Profile.module.scss';
import Breadcrumbs from "../../UI/Breadcrumbs";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";
import classNames from "classnames";
import ProfileSettingsOutput from "./ProfileSettingsOutput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../index";

const Profile = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const queryStringSearch = queryString.parse(location.search);
    const {data} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Профиль', path: "/profile"}
    ]);

    useEffect(() => {
        if (Object.keys(queryStringSearch).length === 0) {
            navigate("/profile?module=settings");
        }
    }, [location]);

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
                    <div className={'col-12 col-md-3'}>
                        <h3 className={'m-t-0 m-b-8 d-none d-md-block'}>Навигация</h3>
                        <ul className={styles['navigation']}>
                            {navigationLinks.map(({name, path, title}) => {
                                if (name === 'product-add' && (data.role !== "ADMIN")){
                                    return null;
                                }

                                return (
                                    <li className={classNames(styles['navigation__item'], name === queryStringSearch.module && styles['navigation__item--active'])}
                                        key={name}>
                                        <span onClick={() => navigate(path)}>{title}</span>
                                    </li>
                                )
                            })}
                            {/*TODO Add logout handler*/}
                            <li className={styles['navigation__item']}>
                                <span onClick={() => {}}>Выход</span>
                            </li>
                        </ul>
                    </div>
                    <div className={classNames(styles['content'], 'col-12 col-md-8')}>
                        {Object.keys(queryStringSearch).length !== 0 &&
                        <>
                            {queryStringSearch.module === 'settings' &&
                            <ProfileSettingsOutput/>
                            }
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;