import React, {useState} from 'react';
import styles from "./ProductCard.module.scss";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {IProductCard} from "./interface";
import {addItemToCart, currencyFormat} from "../../utils/helpers";
import {Link} from "react-router-dom";
import classNames from "classnames";

/**
 * Компонент - карточка товара
 * @param id
 * @param title
 * @param price
 * @param img
 * @constructor
 */
const ProductCard: React.FC<IProductCard> = ({id, title, price, img}) => {

    const [quantity, setQuantity] = useState<number>(1);

    const addToCartHandler = () => {
        addItemToCart(id, quantity);
    }

    return (
        <div className={styles['card']}>
            {img &&
            <div className={styles['card__image-wrapper']}>
                <img className={styles['card__image']} src={img}/>
            </div>
            }
            <Link className={styles['card__title']} to={'/product/' + id}>{title}</Link>
            <div className={styles['card__price']}>{currencyFormat(price)}</div>
            <div className={'d-flex m-t-auto'}>
                <Input className={styles['card__quantity']}
                       value={quantity}
                       onChange={(e) => setQuantity(Number(e.target.value))}
                       type={"number"}
                />
                <Button className={classNames(styles['card__button'], 'm-l-auto')}
                        color={'primary'}
                        onClick={addToCartHandler}
                >В корзину</Button>
            </div>
        </div>
    );
};

export default ProductCard;