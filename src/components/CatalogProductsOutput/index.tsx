import React from 'react';
import {ICatalogProductsOutput} from "./interface";
import {IProduct} from "../../models/product";
import ProductCard from "../ProductCard";

/**
 * Компонент - список товаров
 * @param data
 * @constructor
 */
const CatalogProductsOutput: React.FC<ICatalogProductsOutput> = ({data}) => {

    return (
        <div className={'m-t-16 row'}>
            {data.map(({id, name, price, img}: IProduct, index: number) => (
                <div className={'col-12 col-sm-6 col-md-4 m-b-8'} key={index}>
                    <ProductCard id={id} title={name} price={price} img={img} />
                </div>
        ))}
        </div>
    );
};

export default CatalogProductsOutput;