import React from 'react';
import Breadcrumbs from "../../UI/Breadcrumbs";
import {NavLink} from "react-router-dom";

const Delivery = () => {

    const breadcrumbs = [
        {title: 'Главная', path: '#'},
        {title: 'Доставка', path: "/delivery"}
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>

            <div className={'box m-t-8'}>
                <p className={'m-t-0'}>
                    Дорогой клиент! Избавьте себя от забот при перевозке товара — мы быстро и бережно доставим вашу
                    покупку до квартиры или офиса. При заказе в интернет-магазине <NavLink to={'localhost:3000'}
                             className={'primary'}>www.car-part.kz
                    </NavLink> доставка осуществляется
                    бесплатно (в пределах административных границ города). Пожалуйста, проверьте комплектность и
                    отсутствие дефектов в товаре при его получении.
                </p>
                <h3 className={'m-t-8 m-b-8'}>
                    Оплата банковской картой онлайн
                </h3>
                <p className={'m-t-0 m-b-0 danger'}>
                    Мы везем заказ только со 100 % предоплатой. Оплата возможна с помощью приложения Kaspi.kz.
                </p>
            </div>
        </>
    );
};

export default Delivery;