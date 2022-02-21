import React from "react";
import Breadcrumbs from "../../UI/Breadcrumbs";

const HomePage: React.FC = () => {

    const breadcrumbs = [
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ];
    
    return (
        <div className={'container'}>
            <Breadcrumbs
                links={breadcrumbs}
            />

            {/*<div style={{border: '1px solid red'}}>
                <div className={'row'}>
                    <div className={'col-3'}>
                        Фильтр
                    </div>
                    <div className={'col-9'}>
                        Контент
                    </div>
                </div>
            </div>*/}
        </div>
    )
}

export default HomePage;