import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";
import {RootState} from "../../../../index";
import {getCategories} from "../../../../store/actions/categories";
import {getBrands} from "../../../../store/actions/brands";
import {getModels} from "../../../../store/actions/models";
import {IBrand} from "../../../../models/brand";
import {IModel} from "../../../../models/model";
import {ICategory} from "../../../../models/category";
import Loader from "../../../UI/Loader";
import Breadcrumbs from "../../../UI/Breadcrumbs";
import {getProducts} from "../../../../store/actions/products";

const ProductsOutput: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ]);

    const path = queryString.parse(location.search);
    const brandId = path.brand ? Number(path.brand) : null;
    const modelId = path.model ? Number(path.model) : null;
    const categoryId = path.category ? Number(path.category) : null;

    const {products, loading, error, brands, models, categories} = useSelector((state: RootState) => ({
        products: state.products.data,
        loading: state.products.loading,
        error: state.products.error,
        brands: state.brands.data,
        models: state.models.data,
        categories: state.categories.data,
    }));

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }

        if (brands.length === 0) {
            dispatch(getBrands());
        }

        if (models.length === 0) {
            if (brandId !== null) {
                dispatch(getModels(brandId));
            }
        }

        if (!modelId || !brandId || !categoryId) {
            navigate("/");
        }
    }, [dispatch]);

    useEffect(() => {
        const _breadcrumbs: { title: string, path: string }[] = [];

        const brand = brands.find((brand: IBrand) => brand.id === brandId);
        const model = models.find((model: IModel) => model.id === modelId);
        const category = categories.find((category: ICategory) => Number(category.id) === categoryId);

        if (brand) {
            if (!_breadcrumbs.find((breadcrumb) => breadcrumb.title === brand.name)) {
                _breadcrumbs.push({title: brand.name, path: `/models?brand=${brand.id}`});
            }

            if (model) {
                if (!_breadcrumbs.find((breadcrumb) => breadcrumb.title === model.name)) {
                    _breadcrumbs.push({title: model.name, path: `/categories?brand=${brand.id}&model=${model.id}`});
                }
            }
        }

        if (category) {
            if (!_breadcrumbs.find((breadcrumb) => breadcrumb.title === category.name)) {
                _breadcrumbs.push({title: category.name, path: ""});
            }
        }

        if (_breadcrumbs.length === 3) {
            setBreadcrumbs([...breadcrumbs, ..._breadcrumbs])
        }
    }, [brands, models, categories]);

    useEffect(() => {
        if (brands.length > 0 && models.length > 0 && categories.length > 0){
            dispatch(getProducts({brandId, modelId, categoryId}))
        }
    }, [dispatch, brands, models, categories])

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
            {products.length > 0 ? <>
            </>: <div className={'box m-t-8'}>Товары в данной категории не найдены</div>
            }
        </>
    );
};

export default ProductsOutput;