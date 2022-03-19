import React from 'react';
import {IModel} from "../../models/model";
import Category from "../UI/Category";
import {ICatalogModelsOutput} from "./interface";

const CatalogModelsOutput: React.FC<ICatalogModelsOutput> = ({models, onClickModelHandler}) => {
    return (
        <div className={'col-12'}>
            <div className={'row'}>
                {models.map(({id, name}: IModel) => {
                    return (
                        <div className={'col-12 col-sm-6 col-lg-3 m-t-16 m-b-16'} key={id}>
                            <Category title={name} onClick={() => onClickModelHandler(name)}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CatalogModelsOutput;