import React, {useEffect, useState} from 'react';
import styles from './Navigation.module.scss';
import Input from "../UI/Input";
import Button from "../UI/Button";
import Icon from "../UI/Icon";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import {NavLink} from 'react-router-dom';

/**
 * Компонент - навигация
 * @constructor
 */
const Navigation: React.FC = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const navigate = useNavigate();

    const isAuth = useSelector((state: RootState) => state.auth.isAuth);

    /**
     * Листенер ресайза окна для сброса стейта открытия/скрытия бургер-меню
     */
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992 && isOpenMenu) {
                setIsOpenMenu(!isOpenMenu);
            }
        })
    }, []);

    const clickProfileButtonHandler = () => {
        if (isAuth) {
            navigate("/profile");
        } else {
            navigate("/auth");
        }
    }

    /**
     * Хендлер открытия/скрытия бургер-меню
     */
    const clickMenuButtonHandler = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    /**
     * Кнопка корзины
     */
    const clickCartButtonHandler = () => {
        navigate("/cart");
    }

    return (
        <div className={styles['navigation']}>
            <div className={'row'}>
                <div className={'col-10 col-md-3 col-lg-2 d-flex'}>
                    <NavLink className={styles['navigation__logo']} to={"/"}>CarPart.kz</NavLink>
                </div>
                <div className={'col-md-6 col-lg-8 d-none d-md-flex'}>
                    <div className={'col-md-12 col-lg-6'}>
                        <Input/>
                    </div>
                    <div className={'col-lg-6 d-md-none d-lg-block'}>
                        <nav className={styles['navigation__menu']}>
                            <ul className={classNames(styles['navigation-list'], 'd-flex m-t-auto m-b-auto')}>
                                <li className={classNames(styles['navigation-list__item'], 'm-r-16')}>
                                    <NavLink className={styles['navigation-list__item-link']}
                                             to={'/delivery'}>Доставка</NavLink>
                                </li>
                                <li className={classNames(styles['navigation-list__item'], 'm-r-16')}>
                                    <NavLink className={styles['navigation-list__item-link']}
                                             to={'/contacts'}>Контакты</NavLink>
                                </li>
                                <li className={styles['navigation-list__item']}>
                                    <NavLink className={styles['navigation-list__item-link']}
                                             to={'/about'}>О нас</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className={'col-2 col-md-3 col-lg-2'}>
                    <div className={styles['buttons-container']}>
                        <Button className={'d-none d-md-block m-r-8'}
                                color={'info'}
                                onClick={clickProfileButtonHandler}
                        >
                            <Icon name={'person'}/>
                        </Button>
                        <Button className={'d-none d-md-flex'}
                                color={'primary'}
                                onClick={clickCartButtonHandler}
                        >
                            <>
                                <Icon name={'add_shopping_cart'}/>
                            </>
                        </Button>
                        <Button className={'d-block d-lg-none m-l-8'}
                                onClick={clickMenuButtonHandler}

                        >
                            <Icon name={'menu'}/>
                        </Button>
                    </div>
                </div>
            </div>
            {
                isOpenMenu &&
                <ul className={styles['navigation-list']}>
                    <li className={classNames(styles['navigation-list__item'], 'd-md-none')}>
                        <NavLink className={styles['navigation-list__item-link']}
                                 onClick={() => setIsOpenMenu(false)}
                                 to={isAuth ? "/profile" : "/auth"}>Профиль</NavLink>
                    </li>
                    <li className={classNames(styles['navigation-list__item'], 'd-md-none')}>
                        <NavLink className={styles['navigation-list__item-link']}
                                 onClick={() => setIsOpenMenu(false)}
                                 to={'/cart'}>Корзина</NavLink>
                    </li>
                    <li className={styles['navigation-list__item']}>
                        <NavLink className={styles['navigation-list__item-link']}
                                 onClick={() => setIsOpenMenu(false)}
                                 to={'/delivery'}>Доставка</NavLink>
                    </li>
                    <li className={styles['navigation-list__item']}>
                        <NavLink className={styles['navigation-list__item-link']}
                                 onClick={() => setIsOpenMenu(false)}
                                 to={'/contacts'}>Контакты</NavLink>
                    </li>
                    <li className={styles['navigation-list__item']}>
                        <NavLink className={styles['navigation-list__item-link']}
                                 onClick={() => setIsOpenMenu(false)}
                                 to={'/about'}>О нас</NavLink>
                    </li>
                </ul>
            }
        </div>
    );
};

export default Navigation;