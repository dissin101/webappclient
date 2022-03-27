import React, {useState} from 'react';
import "./ProductCard.scss";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {IProductCard} from "./interface";
import {addItemToCart, currencyFormat} from "../../utils/helpers";
import {Link} from "react-router-dom";

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
        <div className={'card'}>
            {img &&
            <div className={'card__image-wrapper'}>
                <img className={'card__image'} src={img}/>
            </div>
            }
            <Link className={'card__title'} to={'/product/' + id}>{title}</Link>
            <div className={'card__price'}>{currencyFormat(price)}</div>
            <div className={'d-flex m-t-auto'}>
                <Input className={'card__quantity'}
                       value={quantity}
                       onChange={(e) => setQuantity(Number(e.target.value))}
                       type={"number"}
                />
                <Button className={'card__button m-l-auto'}
                        color={'primary'}
                        onClick={addToCartHandler}
                >В корзину</Button>
            </div>
        </div>
    );
};

export default ProductCard;