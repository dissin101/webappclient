import React, {useEffect, useState} from 'react';
import Breadcrumbs from "../../UI/Breadcrumbs";
import {currencyFormat, getItemsFromCard} from "../../../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../store/actions/products";
import {RootState} from "../../../index";
import Loader from "../../UI/Loader";
import {IProduct} from "../../../models/product";
import styles from "./Cart.module.scss";
import classNames from "classnames";
import {Link} from "react-router-dom";
import Icon from "../../UI/Icon";
import Button from "../../UI/Button";
/**
 * Компонент - страница корзины
 * @constructor
 */
const Cart: React.FC = () => {

    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '/'},
        {title: 'Корзина', path: "/cart"}
    ]);

    const [cartItems, setCurtItems] = useState(getItemsFromCard())

    useEffect(() => {
        const cartItemsId = cartItems.map(({id}: any) => id);

        dispatch(getProducts({id: cartItemsId}))
    }, [cartItems]);

    const { products, loading, error
    } = useSelector((state: RootState) => ({
        products: state.products.data,
        error: state.products.error,
        loading: state.products.loading,
    }));

    if (loading) {
        return (
            <div className={'d-flex'}>
                <Loader className={'m-auto'}/>
            </div>
        )
    }

    /* todo Добавить UI компонент для вывода ошибок*/
    if (error) {
        return <div>Ошибка</div>
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={'m-t-16 row'}>
                <div className={'col-lg-8'}>
                    <div className={'box'}>
                        <h3 className={'m-t-0 m-b-8'}>Корзина</h3>
                        <table className={classNames(styles['table'], 'col-12 m-t-8')}>
                            <thead className={'d-none d-lg-table-row'}>
                                <th className={styles['table__th']}>Товар</th>
                                <th className={styles['table__th']}>Количество</th>
                                <th className={styles['table__th']}>Цена</th>
                                <th className={styles['table__th']}>Действие</th>
                            </thead>
                            <tbody>
                            {
                                products.map(({id, name, price, img}: IProduct) => {
                                    const {quantity} = cartItems.find((x: any) => x.id === id);
                                    return(
                                        <tr className={styles['table__tr']}>
                                            <td>
                                                <div>
                                                    <div className={styles["product"]}>
                                                        <div className={styles["product__image-wrapper"]}>
                                                            <img className={styles["product__image"]} src={img}/>
                                                        </div>
                                                        <Link className={styles["product__title"]} to={`/product/${id}}`}>
                                                            {name}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={'m-r-8 grey d-lg-none'}>Количество:</span>
                                                {quantity}
                                            </td>
                                            <td>
                                                <span className={'m-r-8 grey d-lg-none'}>Цена:</span>
                                                {currencyFormat(price)}
                                            </td>
                                            <td>
                                                <span className={'m-r-8 grey d-lg-none'}>Действие:</span>
                                                <Button color={'info'}>
                                                    <Icon name={'delete'}/>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'col-lg-4'}>
                    <div className={classNames(styles['total-container'], 'box')}>
                        <h3 className={'m-t-0 m-b-8'}>Итого</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;