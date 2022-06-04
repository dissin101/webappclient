import React from 'react';
import Breadcrumbs from "../../UI/Breadcrumbs";

const About = () => {

    const breadcrumbs = [
        {title: 'Главная', path: '#'},
        {title: 'О нас', path: "/about"}
    ];

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>

            <div className={'box m-t-8'}>
                <div className={'row'}>
                    <div className={'col-12 col-md-6'}>
                        <h3 className={'primary m-t-0'}>
                            Видение
                        </h3>
                        <p>Постоянно заниматься совершенствованием личных и профессиональных качеств и тем самым
                            приносить
                            добавленную стоимость компании и коллективу. Получать удовольствие от работы в процессе
                            общения
                            с клиентами и нашими коллегами, повышать качество нашей жизни.</p>
                    </div>
                    <div className={'col-12 col-md-6'}>
                        <h3 className={'primary m-t-0'}>
                            Миссия
                        </h3>
                        <p>Быть неоспоримым лидером в области дистрибьюции автозапчастей, благодаря непрерывному
                            совершенствованию своих бизнес-процессов с целью постоянного повышения качества сервиса;
                            завоёвывать доверие клиентов и сохранять статус инновационной Компании на рынке.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;