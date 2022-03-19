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

    /*todo Исправить path состоящий из 2 слов, в хендлерах не добавлять новые хлебные крошки если спускались на уровень ниже*/
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

    useEffect(() => {
        const {brand, model} = Object.fromEntries([...searchParams]);

        dispatch(getBrands());
        dispatch(getCategories());

        let breadcrumbsTemp: {title: string, path: string}[] = [];

        if (brand){
            breadcrumbsTemp = [...breadcrumbsTemp, {
                title: brand,
                path: `?brand=${brand}`
            }];
        }

        if (model){
            breadcrumbsTemp = [...breadcrumbsTemp, {
                title: model,
                path: `?brand=${brand}&model=${model}`
            }];
        }

        setBreadcrumbs([...breadcrumbs, ...breadcrumbsTemp]);

    }, []);

    useEffect(() => {
        const {brand} = Object.fromEntries([...searchParams]);

        if (brand && brands.length > 0){
            const {id} = brands.find((x: IBrand) => x.name === brand);

            dispatch(getModels(id));
        }
    }, [brands])

    const onClickBrandHandler = (brand: string) => {
        setBreadcrumbs([...breadcrumbs, {
            title: brand,
            path: `?brand=${brand}`
        }]);

        setSearchParams({brand});

        const {id} = brands.find((x: IBrand) => x.name === brand);

        dispatch(getModels(id));
    }

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

    const [content, setContent] = useState<ReactElement | null>(null);

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