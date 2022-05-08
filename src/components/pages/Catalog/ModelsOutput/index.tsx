import React, {useEffect, useState} from 'react';
import styles from "./ModelsOutput.module.scss";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";
import {getModels} from "../../../../store/actions/models";
import {RootState} from "../../../../index";
import Loader from "../../../UI/Loader";
import Breadcrumbs from "../../../UI/Breadcrumbs";
import {getBrands} from "../../../../store/actions/brands";
import {IBrand} from "../../../../models/brand";
import {IModel} from "../../../../models/model";

/**
 * Страница списка моделей бренда
 * @constructor
 */
const ModelsOutput: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ]);

    const path = queryString.parse(location.search);
    const brandId = path.brand ? Number(path.brand) : null;

    const {models, loading, error, brands} = useSelector((state: RootState) => ({
        models: state.models.data,
        loading: state.models.loading,
        error: state.models.error,
        brands: state.brands.data
    }));

    useEffect(() => {
        if (brandId !== null) {
            dispatch(getModels(brandId));
        } else {
            navigate("/");
        }

        if (brands.length === 0) {
            dispatch(getBrands());
        }
    }, [dispatch]);

    useEffect(() => {
        if (brands.length > 0) {
            const brand = brands.find((brand: IBrand) => brand.id === Number(brandId));
            if (brand) {
                setBreadcrumbs([...breadcrumbs, {title: brand.name, path: ""}]);
            }
        }
    }, [brands]);

    const onClickModelHandler = (modelId: number) => {
        navigate(`/categories${location.search}&model=${modelId}`)
    }

    if (loading) {
        return (
            <Loader className={'m-auto'}/>
        )
    }

    if (error) {
        /* todo add Plug*/
        return (
            <div>PLUG</div>
        )
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            {models.length > 0 ?
                <div className={classNames(styles["models-wrapper"], 'row')}>
                    {models.map((model: IModel) => (
                        <div className={classNames(styles['model-wrapper'], 'col-12 col-md-3')} key={model.id}>
                            <div className={styles['model']}
                                 onClick={() => onClickModelHandler(model.id)}>{model.name}</div>
                        </div>
                    ))}
                </div>
                :
                <div className={'box m-t-8'}>Список моделей пуст</div>
            }
        </>
    );
};

export default ModelsOutput;