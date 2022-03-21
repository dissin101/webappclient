import React from 'react';
import './Category.scss';

interface ICategory {
    title: string
    label?: string | null
    img?: string | null
    onClick?: () => void
}

const Category = ({title, label, img, onClick}: ICategory) => {

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

export default Category;