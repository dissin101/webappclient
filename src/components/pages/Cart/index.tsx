import React, {useEffect, useState} from 'react';
import Breadcrumbs from "../../UI/Breadcrumbs";
import {currencyFormat, getItemsFromCart, removeItemFromCart} from "../../../utils/helpers";
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
import Input from "../../UI/Input";

/**
 * Компонент - страница корзины
 * @constructor
 */
const Cart: React.FC = () => {

    const dispatch = useDispatch();

    const breadcrumbs = [
        {title: 'Главная', path: '/'},
        {title: 'Корзина', path: "/cart"}
    ];

    const [cartItems, setCurtItems] = useState(getItemsFromCart())

    useEffect(() => {
        if (cartItems.length > 0) {
            const cartItemsId = cartItems.map(({id}: any) => id);

            dispatch(getProducts({id: cartItemsId}))
        }
    }, [cartItems]);

    const {
        products, loading, error
    } = useSelector((state: RootState) => ({
        products: state.products.data,
        error: state.products.error,
        loading: state.products.loading,
    }));

    const setQuantityHandler = (id: number, value: number) => {

    }

    const removeItemHandler = (id: number) => {
        removeItemFromCart(id);

        setCurtItems(getItemsFromCart());
    }

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
            <div className={classNames(styles['container'], 'm-t-8 row')}>
                <div className={classNames(styles['cart-wrapper'], 'col-lg-8')}>
                    <div className={'box'}>
                        <h3 className={'m-t-0 m-b-8'}>Корзина</h3>
                        {products.length > 0 && cartItems.length > 0 ?
                            <table className={styles['table']}>
                                <thead className={styles['table__head']}>
                                <tr className={styles['table__head-row']}>
                                    <th className={styles['table__head-item']}>Товар</th>
                                    <th className={styles['table__head-item']}>Количество</th>
                                    <th className={styles['table__head-item']}>Цена</th>
                                    <th className={styles['table__head-item']}>Действие</th>
                                </tr>
                                </thead>
                                <tbody className={styles['table__body']}>
                                {
                                    products.map(({id, name, price, img}: IProduct) => {
                                        const cartItem = cartItems.find((x: any) => x.id === id);
                                        if (cartItem){
                                            const {quantity} = cartItem;
                                            return (
                                                <tr className={styles['table__body-row']} key={id}>
                                                    <td className={styles['table__body-item']}>
                                                        <div className={'d-flex align-items-center'}>
                                                            <img className={styles['image']} src={img}/>
                                                            <Link className={styles['title']}
                                                                  to={`/product/${id}`}>{name}</Link>
                                                        </div>
                                                    </td>
                                                    <td className={styles['table__body-item']}>
                                                        <div className={'d-flex'}>
                                                            <span className={styles['label']}>Количество:</span>
                                                            {quantity}
                                                            {/*<Input className={styles['card__quantity']}
                                                       value={quantity}
                                                       onChange={(e) => setQuantityHandler(id, Number(e.target.value))}
                                                       type={"number"}
                                                />*/}
                                                        </div>
                                                    </td>
                                                    <td className={styles['table__body-item']}>
                                                        <div className={'d-flex'}>
                                                            <span className={styles['label']}>Цена:</span>
                                                            <span className={styles['price']}>
                                                        {currencyFormat(price)}
                                                    </span>
                                                        </div>
                                                    </td>
                                                    <td className={styles['table__body-item']}>
                                                        <div className={'d-flex align-items-center justify-content-start'}>
                                                            <span className={styles['label']}>Действие:</span>
                                                            <Button color={'info'} onClick={() => removeItemHandler(id)}>
                                                                <Icon name={'delete'}/>
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } else <></>;
                                    })
                                }
                                </tbody>
                            </table> :
                            <div>Корзина пустая</div>
                        }
                    </div>
                </div>
                <div className={classNames(styles['total-wrapper'], 'col-lg-4')}>
                    <div className={classNames(styles['total-container'], 'box')}>
                        <h3 className={'m-t-0 m-b-8'}>Итого</h3>
                        <div className={'d-flex'}>
                            <Button color={'info'} className={'m-l-auto m-r-auto'} disabled={products.length === 0 && cartItems.length === 0}>
                                Оформить заказ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;