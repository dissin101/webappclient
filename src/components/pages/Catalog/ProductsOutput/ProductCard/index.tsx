import React, {useState} from 'react';
import styles from "./ProductCard.module.scss";
import Input from "../../../../UI/Input";
import Button from "../../../../UI/Button";
import {IProductCard} from "./interface";
import {addItemToCart, currencyFormat} from "../../../../../utils/helpers";
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
        <Link className={styles['card']} to={'/product/' + id}>
            {img &&
            <div className={styles['card__image-wrapper']}>
                <img className={styles['card__image']} src={img}/>
            </div>
            }
            <h3 className={styles['card__title']}>{title}</h3>
            <div className={'m-t-auto'}>
                <div className={styles['card__price']}>{currencyFormat(price)}</div>
                <div className={'d-flex'} onClick={(e) => e.preventDefault()}>
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
        </Link>
    );
};

export default ProductCard;