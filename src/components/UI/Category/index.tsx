import React from 'react';
import './Category.scss';

interface CategoryInterface {
    title: string
    label?: string | null
    img?: string | null
}

const Category = ({title, label, img}: CategoryInterface ) => (
    <div className={'category'}>
        <div className={'category__image-container'}>
            { img &&
                <img className={'category__image'} src={img} />
            }
        </div>
        <div className={'category__inner'}>
            <span className={'category__title'}>{title}</span>
            {label &&
                <p className={'category__label'}>{label}</p>
            }
        </div>
    </div>
);

export default Category;