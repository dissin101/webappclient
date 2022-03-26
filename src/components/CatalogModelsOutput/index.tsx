import React from 'react';
import {IModel} from "../../models/model";
import CategoryCard from "../CategoryСard";
import {ICatalogModelsOutput} from "./interface";

/**
 * Компонент - список моделей товаров
 * @param models
 * @param onClickModelHandler
 * @constructor
 */
const CatalogModelsOutput: React.FC<ICatalogModelsOutput> = ({models, onClickModelHandler}) => {
    return (
        <div className={'row'}>
            {models.map(({id, name}: IModel) => {
                return (
                    <div className={'col-12 col-sm-6 col-lg-3'} key={id}>
                        <CategoryCard title={name} onClick={() => onClickModelHandler(name)}/>
                    </div>
                )
            })}
        </div>
    );
};

export default CatalogModelsOutput;