import React from 'react';
import Breadcrumbs from "../../UI/Breadcrumbs";

const Contacts = () => {

    const breadcrumbs = [
        {title: 'Главная', path: '#'},
        {title: 'Контакты', path: "/contacts"}
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>

            <div className={'box m-t-8'}>
                <div className={'row'}>
                    <div className={'col-12 col-md-4'}>
                        <h2 className={'m-t-8 m-b-0'}>Адрес:</h2>
                        <p className={'m-b-8'}>г. Нур-Султан</p>
                        <a className={'primary m-t-8'}
                           target={"_blank"}
                           href="https://2gis.kz/nur_sultan/inside/9570784863332395/firm/70000001034431417/71.4708%2C51.167414?m=71.470531%2C51.167324%2F17.88">ул.
                            Циолковского 4</a>
                    </div>
                    <div className={'col-12 col-md-4'}>
                        <h2 className={'m-t-8 m-b-4'}>Контакты:</h2>
                        <div className={'d-flex flex-column m-t-16'}>
                            <a className={'primary'} href="tel:+77006532254">+7 (700) 653-22-54</a>
                            <a className={'primary m-t-8'} href="tel:+77786412596">+7 (778) 641-25-96</a>
                        </div>
                    </div>
                    <div className={'col-12 col-md-4'}>
                        <h2 className={'m-t-8 m-b-4'}>График работы:</h2>
                        <ul className={'m-l-16 m-t-16'}>
                            <li>ПН-ПТ: 10:00 - 18:00</li>
                            <li className={'m-t-8'}>СБ: 10:00 - 16:00</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;