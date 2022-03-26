import React from 'react';
import './Category.scss';
import {ICategory} from "./interface";

/**
 * Компонент - карточка категорий
 * @param title
 * @param label
 * @param img
 * @param onClick
 * @constructor
 */
const CategoryCard:React.FC<ICategory> = ({title, label, img, onClick}) => {

    return (
        <div className={'category'} onClick={onClick}>
            {img && (
                <div className={'category__image-container'}>
                    <img className={'category__image'} src={img}/>
                </div>)
            }
            <div className={'category__inner'}>
                <span className={'category__title'}>{title}</span>
                {label &&
                <p className={'category__label'}>{label}</p>
                }
            </div>
        </div>
    )
};

export default CategoryCard;