import React, {ReactElement, useEffect, useState} from "react";
import Breadcrumbs from "../../UI/Breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {getBrands} from "../../../store/actions/brands";
import {RootState} from "../../../index";
import {IBrand} from "../../../models/brand";
import Loader from "../../UI/Loader";
import {useSearchParams} from "react-router-dom";
import {getModels} from "../../../store/actions/models";
import {getCategories} from "../../../store/actions/categories";
import CategoriesTree from "../../CategoriesTree";
import CatalogBrandsOutput from "../../CatalogBrandsOutput";
import CatalogModelsOutput from "../../CatalogModelsOutput";

const Catalog: React.FC = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ]);

    const { brands, loading, brandsError, models, modelsError,
        categories, categoriesError
    } = useSelector((state: RootState) => ({
        brands: state.brands.data, brandsError: state.brands.error,
        models: state.models.data, modelsError: state.brands.error,
        categories: state.categories.data, categoriesError: state.categories.error,
        loading: state.brands.loading || state.categories.loading || state.models.loading,
    }));

    /**
     * Получение списка брендов и категорий при инициализации
     */
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, []);

    /**
     * Редактирование хлебных крошек в зависимости от выбранной марки/модели авто
     */
    useEffect(() => {
        const {brand, model} = Object.fromEntries([...searchParams]);

        let breadcrumbsTemp = breadcrumbs.slice(0,2);

        if (brand){
            breadcrumbsTemp.push({
                title: brand,
                path: `?brand=${brand}`
            });

            if (model){
                breadcrumbsTemp.push({
                    title: model,
                    path: `?brand=${brand}&model=${model}`
                });
            }
        }

        setBreadcrumbs(breadcrumbsTemp);

    }, [searchParams])

    /**
     * Получение списка моделей авто в зависимости от марки авто
     */
    useEffect(() => {
        const {brand} = Object.fromEntries([...searchParams]);

        if (brand && brands.length > 0){
            const {id} = brands.find((x: IBrand) => x.name === brand);

            dispatch(getModels(id));
        }
    }, [brands])

    /**
     * Хендлер клика по карточке бренда
     * @param brand
     */
    const onClickBrandHandler = (brand: string) => {
        setBreadcrumbs([...breadcrumbs, {
            title: brand,
            path: `?brand=${brand}`
        }]);

        setSearchParams({brand});

        const {id} = brands.find((x: IBrand) => x.name === brand);

        dispatch(getModels(id));
    }

    /**
     * Хендлер клика по карточке модели
     * @param model
     */
    const onClickModelHandler = (model: string) => {
        const {brand} = Object.fromEntries([...searchParams]);

        setBreadcrumbs([...breadcrumbs, {
            title: model,
            path: `?brand=${brand}&model=${model}`
        }]);

        const params = Object.fromEntries([...searchParams]);

        setSearchParams({...params, model});

        dispatch(getCategories());
    }

    /**
     * Стейт контента в зависиомти от выбранных параметров
     */
    const [content, setContent] = useState<ReactElement | null>(null);


    /**
     * Запись в стейт контента
     */
    useEffect(() => {
        const {brand, model} = Object.fromEntries([...searchParams]);

        if (!brand || !model && brands.length > 0){
            setContent(
                <CatalogBrandsOutput brands={brands} onClickBrandHandler={onClickBrandHandler} />
            );
        }

        if (brand && models.length > 0){
            setContent(
                <CatalogModelsOutput models={models} onClickModelHandler={onClickModelHandler} />
            );
        }

        if (brand && model && categories.length > 0){
            setContent(
                <CategoriesTree list={categories} onSelectCallback={(e: any) => console.log(e)} />
            );
        }

    }, [searchParams, brands, models, categories])

    if (loading) {
        return (
            <div className={'d-flex'}>
                <Loader className={'m-auto'}/>
            </div>
        )
    }

    /*todo Добавить UI компонент для вывода ошибок*/
    if (brandsError || modelsError || categoriesError) {
        return <div>Ошибка</div>
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={'row m-t-16'}>
                <h3 className={'m-0 col-12'}>Запчасти</h3>
                {!!content ?
                    content :
                    <div className={'col-12 m-t-8'}>Список пуст</div>
                }
            </div>
        </>
    )
}

export default Catalog;