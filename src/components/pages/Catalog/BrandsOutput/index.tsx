import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RootState} from "../../../../index";
import {getBrands} from "../../../../store/actions/brands";
import Loader from "../../../UI/Loader";
import {IBrand} from "../../../../models/brand";
import styles from "./BrandsOutput.module.scss";
import classNames from "classnames";
import Breadcrumbs from "../../../UI/Breadcrumbs";

/**
 * Страница списка брендов
 * @constructor
 */
const BrandsOutput: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const breadcrumbs = [
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ];

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch])

    const {brands, loading, error} = useSelector((state: RootState) => ({
        brands: state.brands.data,
        loading: state.brands.loading,
        error: state.brands.error
    }));

    const onClickBrandHandler = (brandId: number) => {
        navigate(`/models?brand=${brandId}`);
    }

    if (loading) {
        return (
            <Loader className={'m-auto'}/>
        )
    }

    if (error){
        /* todo add Plug*/
        return (
            <div>Ошибка</div>
        )
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={classNames(styles['brands-wrapper'], 'row')}>
                {brands.map((brand: IBrand) => (
                    <div className={classNames(styles['brand-wrapper'], 'col-12 col-md-4')} key={brand.id}>
                        <div className={styles['brand']} onClick={() => onClickBrandHandler(brand.id)}>
                            <div className={styles['brand__image-wrapper']}>
                                <img className={styles['brand__image']} src={brand.img} alt={brand.name}/>
                            </div>
                            <div className={styles['brand__inner']}>
                                <h3 className={styles['brand__name']}>{brand.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default BrandsOutput;