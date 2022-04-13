import React from 'react';
import styles from './CategoryCard.module.scss';
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
        <div className={styles['category']} onClick={onClick}>
            {img && (
                <div className={styles['category__image-container']}>
                    <img className={styles['category__image']} src={img}/>
                </div>)
            }
            <div className={styles['category__inner']}>
                <span className={styles['category__title']}>{title}</span>
                {label &&
                <p className={styles['category__label']}>{label}</p>
                }
            </div>
        </div>
    )
};

export default CategoryCard;