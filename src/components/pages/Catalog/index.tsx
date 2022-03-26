import React, {ReactElement, useEffect, useState} from "react";
import Breadcrumbs from "../../Breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import {getBrands} from "../../../store/actions/brands";
import {RootState} from "../../../index";
import {IBrand} from "../../../models/brand";
import Loader from "../../Loader";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getModels} from "../../../store/actions/models";
import {getCategories} from "../../../store/actions/categories";
import CatalogCategoriesTreeOutput from "../../CatalogCategoriesTreeOutput";
import CatalogBrandsOutput from "../../CatalogBrandsOutput";
import CatalogModelsOutput from "../../CatalogModelsOutput";
import {getProducts} from "../../../store/actions/products";
import CatalogProductsOutput from "../../CatalogProductsOutput";
import {IModel} from "../../../models/model";
import {ICategory} from "../../../models/category";

const Catalog: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ]);

    const { brands, loading, brandsError, models, modelsError,
        categories, categoriesError, products, productsError
    } = useSelector((state: RootState) => ({
        brands: state.brands.data, brandsError: state.brands.error,
        models: state.models.data, modelsError: state.brands.error,
        categories: state.categories.data, categoriesError: state.categories.error,
        products: state.products.data, productsError: state.products.error,
        loading: state.brands.loading || state.models.loading || state.categories.loading || state.products.loading,
    }));

    /**
     * Получение списка брендов и категорий при инициализации
     */
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, []);

    /**
     * Построение хлебных крошек при наличии в query-string параметров
     */
    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        let _breadcrumbs = breadcrumbs.slice(0,2);

        let path = "";
        Object.keys(params).forEach(function(key, index) {

            if (index === 0){
                path = `?${key}=${params[key]}`;
            } else {
                path += `&${key}=${params[key]}`;
            }

            _breadcrumbs.push({
                title: params[key],
                path
            });
        }, params);

        setBreadcrumbs(_breadcrumbs);

    }, [searchParams]);

    /**
     * Получение списка моделей авто в зависимости от марки авто
     */
    useEffect(() => {
        const {brand} = Object.fromEntries([...searchParams]);

        if (brand && brands.length > 0){
            if (brands.find((x: IBrand) => x.name === brand)) {
                const {id} = brands.find((x: IBrand) => x.name === brand);

                dispatch(getModels(id));
            } else {
                navigate("/");
            }
        }
    }, [brands])

    /**
     * Получение списка товаров
     */
    useEffect(() => {
        const {brand, model, category} = Object.fromEntries([...searchParams]);

        if (category && brands.length > 0 && models.length > 0 && categories.length > 0){
            const brandId = brands.find((x: IBrand) => x.name === brand).id;

            const modelId = models.find((x: IModel) => x.name === model).id;

            if (categories.find((x: ICategory) => x.name === category)){
                const categoryId = categories.find((x: ICategory) => x.name === category).id;

                dispatch(getProducts({brandId, modelId, categoryId}));
            } else {
                navigate(`/?brand=${brand}&model=${model}`);
            }
        }

    }, [searchParams, brands, models, categories])

    /**
     * Хендлер клика по карточке бренда
     * @param brand
     */
    const onClickBrandHandler = (brand: string) => {
        setSearchParams({brand});

        const {id} = brands.find((x: IBrand) => x.name === brand);

        dispatch(getModels(id));
    };

    /**
     * Хендлер клика по карточке модели
     * @param model
     */
    const onClickModelHandler = (model: string) => {
        const params = Object.fromEntries([...searchParams]);

        setSearchParams({...params, model});

        dispatch(getCategories());
    };

    /**
     * Хендлер клика по элементу категории
     * @param name
     * @param id
     */
    const onClickCategoryHandler = ({name, id}: any) => {
        const {brand, model} = Object.fromEntries([...searchParams]);

        const params = Object.fromEntries([...searchParams]);

        setSearchParams({...params, category: name});

        const brandId = brands.find((x: IBrand) => x.name === brand).id;

        if (models.find((x: IModel) => x.name === model)) {
            const modelId = models.find((x: IModel) => x.name === model).id;

            dispatch(getProducts({brandId, modelId, categoryId: id}));
        } else {
            navigate(`/?brand=${brand}`);
        }
    };

    /**
     * Стейт контента в зависиомти от выбранных параметров
     */
    const [content, setContent] = useState<ReactElement | null>(null);

    /**
     * Запись в стейт контента
     */
    useEffect(() => {
        const {brand, model, category} = Object.fromEntries([...searchParams]);

        if (brands.length > 0) {
            setContent(
                <CatalogBrandsOutput brands={brands} onClickBrandHandler={onClickBrandHandler}/>
            );

            if (brand && models.length > 0) {
                setContent(
                    <CatalogModelsOutput models={models} onClickModelHandler={onClickModelHandler}/>
                );

                if (model && categories.length > 0) {
                    setContent(
                        <CatalogCategoriesTreeOutput list={categories} onSelectCallback={(e: any) => onClickCategoryHandler(e)}/>
                    );

                    if (category){
                        if (products.length > 0) {
                            setContent(
                                <CatalogProductsOutput data={products}/>
                            );
                        } else {
                            setContent(null);
                        }
                    }
                }
            }
            return;
        }


    }, [searchParams , brands, models, categories, products]);

    if (loading) {
        return (
            <div className={'d-flex'}>
                <Loader className={'m-auto'}/>
            </div>
        )
    }

    /* todo Добавить UI компонент для вывода ошибок*/
    if (brandsError || modelsError || categoriesError || productsError) {
        return <div>Ошибка</div>
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={'m-t-16'}>
                {/*<h3 className={'m-0'}>Запчасти</h3>*/}
                {!!content ?
                    content :
                    <div className={'m-t-8 box'}>Список пуст</div>
                }
            </div>
        </>
    )
}

export default Catalog;