import React from 'react';
import "./Loader.scss";
import classNames from "classnames";
import {ILoader} from "./interface";

/**
 * Компонент - лоадер
 * @param className
 * @constructor
 */
const Loader: React.FC<ILoader> = ({className}) => {
    return (
        <div className={classNames('loader', className)}/>
    );
};

export default Loader;