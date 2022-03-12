import React, {useEffect} from "react";
import Breadcrumbs from "../../UI/Breadcrumbs";
import Category from "../../UI/Category";
import {useDispatch, useSelector} from "react-redux";
import {getBrands} from "../../../store/actions/brands";
import {RootState} from "../../../index";
import {IBrand} from "../../../models/brand";
import Loader from "../../UI/Loader";

const HomePage: React.FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const {brands, brandsLoading, brandsError} = useSelector((state: RootState) => ({
        brands: state.brands.data,
        brandsLoading: state.brands.loading,
        brandsError: state.brands.error
    }));

    const breadcrumbs = [
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ];

    const servicing = [
        {title: 'Моторные масла', imageUrl: 'https://www.phaeton.kz/Content/img/engine-oil.png'},
        {title: 'Трансмиссионные  масла', imageUrl: 'https://www.phaeton.kz/Content/img/transmission-oil.png'},
        {title: 'Охлаждающая жидкость', imageUrl: 'https://www.phaeton.kz/Content/img/coolant.png'},
        {title: 'Тормозная жидкость', imageUrl: 'https://www.phaeton.kz/Content/img/brake-fluid.png'},
        {title: 'Смазки', imageUrl: 'https://www.phaeton.kz/Content/img/automotive-grease.png'},
        {title: 'Гидравлические масла', imageUrl: 'https://www.phaeton.kz/Content/img/hydrualics.png'},
    ];

    if (brandsLoading){
        return (
            <div className={'d-flex'}>
                <Loader className={'m-auto'}/>
            </div>
        )
    }

    /*todo Добавить UI компонент для вывода ошибок*/
    if (brandsError) return <div>Ошибка</div>

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={'row m-t-16'}>
                <h3 className={'m-0 col-12'}>Запчасти</h3>
                {!!brands && brands.length > 0 ?
                    <div className={'col-12'}>
                        <div className={'row'}>
                            {brands.map(({name, img, id}: IBrand) => {
                                return (
                                    <div className={'col-3 m-t-16 m-b-16'} key={id}>
                                        <Category title={name} img={img}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div> :
                    <div className={'col-12'}>
                        <p>Список пуст</p>
                    </div>
                }
                <div className={'col-12'}>
                    <h3 className={'m-0'}>Обслуживание</h3>
                    <div className={'row'}>
                        {servicing.map(({title, imageUrl}) => (
                            <div className={'col-3 m-t-16 m-b-16'}>
                                <Category title={title} img={imageUrl}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;