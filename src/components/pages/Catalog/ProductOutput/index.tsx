import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../../../store/actions/products";
import {RootState} from "../../../../index";
import Loader from "../../../UI/Loader";
import Breadcrumbs from "../../../UI/Breadcrumbs";
import styles from "./Product.module.scss";
import {addItemToCart, currencyFormat} from "../../../../utils/helpers";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import {getBrands} from "../../../../store/actions/brands";
import {getModels} from "../../../../store/actions/models";
import {IBrand} from "../../../../models/brand";
import {IModel} from "../../../../models/model";
import {getCategories} from "../../../../store/actions/categories";
import {ICategory} from "../../../../models/category";
import classNames from "classnames";

/**
 * Компонент - страница товара
 * @constructor
 */
const Product: React.FC = () => {

    const params = useParams();
    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '/'},
        {title: 'Каталог', path: "/"}
    ]);

    /* todo Добавить Notify при добавлении предмета в корзину */
    const [quantity, setQuantity] = useState(1);

    /**
     * Получение информации о товаре, получение списка брендов и категорий
     */
    useEffect(() => {
        if (params.id) {
            const id = Number(params.id);

            dispatch(getProduct(id));
        }

        dispatch(getBrands());
        dispatch(getCategories());
    }, [])

    const {product, loading, error, brands, models, categories} = useSelector((state: RootState) => ({
        product: state.product.data,
        loading: state.product.loading || state.brands.loading || state.models.loading || state.categories.loading,
        error: state.product.error,
        brands: state.brands.data,
        models: state.models.data,
        categories: state.categories.data
    }));

    /**
     * Получение списка моделей бренда
     */
    useEffect(() => {
        if (!!product) {
            dispatch(getModels(product.brandId));
        }
    }, [product])

    /**
     * Построение хлебных крошек
     */
    useEffect(() => {
        if (product) {
            let _breadcrumbs = breadcrumbs.slice(0, 2);
            const brand = brands.find((x: IBrand) => x.id === product.brandId);
            const model = models.find((x: IModel) => x.id === product.modelId);
            const category = categories.find((x: ICategory) => x.id === product.categoryId);

            if (brand) {
                _breadcrumbs.push({
                    title: brand.name,
                    path: `/models?brand=${brand.id}`
                });

                if (model) {
                    _breadcrumbs.push({
                        title: model.name,
                        path: `/categories?brand=${brand.id}&model=${model.id}`
                    });

                    if (category) {
                        _breadcrumbs.push({
                            title: category.name,
                            path: `/products?brand=${brand.id}&model=${model.id}&category=${category.id}`
                        });
                    }
                }
            }

            _breadcrumbs.push({
                title: product.name,
                path: `/product/${product.id}`
            });

            setBreadcrumbs(_breadcrumbs);
        }
    }, [product, brands, models, categories]);

    const addToCartHandler = () => {
        const {id} = product;
        addItemToCart(id, quantity);
    }

    if (loading) {
        return (
            <div className={'d-flex'}>
                <Loader className={'m-auto'}/>
            </div>
        )
    }

    /*todo обработать ошибку*/
    if (error) {
        return (
            <div> Ошибка </div>
        )
    }

    /* todo добавить состояние для кнопки "В корзину" */

    if (product) {
        /*todo для товарной позиции добавить поле с описанием, заменить поле name на title*/
        const {id, name, price, img} = product;

        return (
            <>
                <Breadcrumbs links={breadcrumbs}/>
                <div className={classNames(styles['product'], 'm-t-8')}>
                    <div className={classNames(styles['product__info'], 'box')}>
                        <div className={'row justify-content-center justify-content-md-start'}>
                            <div className={'col-8 col-md-4 d-flex'}>
                                <div className={classNames(styles['product__image-wrapper'], 'm-t-auto m-b-auto')}>
                                    <img className={styles['product__image']} src={"/" + img}/>
                                </div>
                            </div>
                            <div className={'col-12 col-md-8 d-flex flex-column'}>
                                <h4 className={styles['product__title']}>{name}</h4>

                                <span className={styles['product__price']}>{currencyFormat(price)}</span>

                                <div className={styles['product__description']}>
                                    Space for product description. It is mostly used for understanding what product do
                                    or about is. This description has heavy impact on the users! Also great for SEO, to
                                    boost your store sales.
                                </div>

                                <div className={'row m-t-auto'}>
                                    <div className={'col-4'}>
                                        <Input className={classNames(styles['product__quantity'])}
                                               value={quantity}
                                               type={'number'}
                                               onChange={(e) => setQuantity(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className={'col-8'}>
                                        <Button className={classNames(styles['product__button'])}
                                                color={'primary'}
                                                onClick={addToCartHandler}
                                        >В корзину</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className={'m-t-8 m-b-8'}>Характеристики</h2>
                    <div className={classNames(styles['product__params'], 'box')}>
                        {/*<div className={classNames('product__params-item', 'row')}>
                            <div className={classNames(styles['product__params-title'], 'col-12 col-md-4')}>Вес</div>
                            <div className={classNames(styles['product__params-value'], 'col-12 col-md-8')}>200гр</div>
                        </div>
                        <div className={classNames(styles['product__params-item'], 'row')}>
                            <div className={classNames(styles['product__params-title'], 'col-12 col-md-4')}>Вес</div>
                            <div className={classNames('product__params-value', 'col-12 col-md-8')}>200гр</div>
                        </div>*/}
                    </div>
                </div>
            </>
        );
    } else {
        return <div>
            Товар не найден
        </div>
    }
};

export default Product;