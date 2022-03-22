import React from 'react';
import {IBrand} from "../../models/brand";
import CategoryCard from "../CategoryСard";
import {ICatalogBrandsOutput} from "./interface";

const CatalogBrandsOutput: React.FC<ICatalogBrandsOutput> = ({brands, onClickBrandHandler}) => (
    <div className={'row'}>
        {brands.map(({id, name, img}: IBrand) => {
            return (
                <div className={'col-12 col-sm-6 col-lg-3 m-t-16 m-b-16'} key={id}>
                    <CategoryCard title={name} img={img} onClick={() => onClickBrandHandler(name)}/>
                </div>
            )
        })}
    </div>
)

export default CatalogBrandsOutput;