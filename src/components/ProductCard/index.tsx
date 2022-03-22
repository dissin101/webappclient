import React, {useState} from 'react';
import "./ProductCard.scss";
import Input from "../UI/Input";
import Button from "../UI/Button";
import {IProductCard} from "./interface";
import {currencyFormat} from "../../utils/helpers";
import {Link} from "react-router-dom";

const ProductCard: React.FC<IProductCard> = ({id, title, price, img}) => {

    const [quantity, setQuantity] = useState(1);

    /*todo добавить хендлер добавления в корзину*/

    return (
        <div className={'card'}
            onClick={() => console.log("BOX")}
        >
            {img &&
            <div className={'card__image-wrapper'}>
                <img className={'card__image'} src={img}/>
            </div>
            }
            <Link className={'card__title'} to={'/product/' + id}>{title}</Link>
            <div className={'card__price'}>{currencyFormat(price)}</div>
            <div className={'d-flex m-t-auto'}>
                <Input className={'card__quantity'} value={quantity}/>
                <Button className={'card__button m-l-auto'}
                        color={'primary'}
                        onClick={(e: any) => {
                            e.preventDefault()
                            console.log("button")
                        }}
                >В корзину</Button>
            </div>
        </div>
    );
};

export default ProductCard;