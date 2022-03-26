import React, {useEffect, useState} from 'react';
import './Navigation.scss';
import Input from "../UI/Input";
import Button from "../UI/Button";
import Icon from "../UI/Icon";

/**
 * Компонент - навигация
 * @constructor
 */
const Navigation: React.FC = () => {

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    /**
     * Листенер ресайза окна для сброса стейта открытия/скрытия бургер-меню
     */
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992 && isOpenMenu) {
                setIsOpenMenu(!isOpenMenu);
            }
        })
    });

    /**
     * Хендлер открытия/скрытия бургер-меню
     */
    const clickMenuButtonHandler = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <div className={'navigation'}>
            <div className={'row'}>
                <div className={'col-10 col-md-3 col-lg-2 d-flex'}>
                    <a className={'navigation__logo'} href={"/"}>CarPart.kz</a>
                </div>
                <div className={'col-md-6 col-lg-8 d-none d-md-flex'}>
                    <div className={'col-md-12 col-lg-6'}>
                        <Input/>
                    </div>
                    <div className={'col-lg-6 d-md-none d-lg-block'}>
                        <nav className={'navigation__menu'}>
                            <ul className={'navigation-list d-flex m-t-auto m-b-auto'}>
                                <li className={'navigation-list__item m-r-16'}>
                                    <a className={'navigation-list__item-link'}
                                       href={'#'}>Доставка</a>
                                </li>
                                <li className={'navigation-list__item m-r-16'}>
                                    <a className={'navigation-list__item-link'}
                                       href={'#'}>Контакты</a>
                                </li>
                                <li className={'navigation-list__item'}>
                                    <a className={'navigation-list__item-link'}
                                       href={'#'}>О нас</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className={'col-2 col-md-3 col-lg-2'}>
                    <div className={'buttons-container'}>
                        <Button className={'d-none d-md-block m-r-8'}
                                color={'info'}
                        >
                            <Icon name={'person'}/>
                        </Button>
                        <Button className={'d-none d-md-flex'}
                                color={'primary'}
                        >
                            <>
                                <Icon name={'add_shopping_cart'}/>
                                <span className={'d-none d-lg-block m-l-8'}> 0 ₸</span>
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
                <ul className={'navigation-list'}>
                    <li className={'navigation-list__item d-md-none'}>
                        <a className={'navigation-list__item-link'}
                           href={'#'}>Профиль</a>
                    </li>
                    <li className={'navigation-list__item d-md-none'}>
                        <a className={'navigation-list__item-link'}
                           href={'#'}>Корзина</a>
                    </li>
                    <li className={'navigation-list__item'}>
                        <a className={'navigation-list__item-link'}
                           href={'#'}>Доставка</a>
                    </li>
                    <li className={'navigation-list__item'}>
                        <a className={'navigation-list__item-link'}
                           href={'#'}>Контакты</a>
                    </li>
                    <li className={'navigation-list__item'}>
                        <a className={'navigation-list__item-link'}
                           href={'#'}>О нас</a>
                    </li>
                </ul>
            }
        </div>
    );
};

export default Navigation;