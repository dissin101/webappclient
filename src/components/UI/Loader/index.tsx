import React from 'react';
import styles from "./Loader.module.scss";
import classNames from "classnames";
import {ILoader} from "./interface";

/**
 * Компонент - лоадер
 * @param className
 * @constructor
 */
const Loader: React.FC<ILoader> = ({className}) => {
    return (
        <div className={classNames(styles['loader'], className)}/>
    );
};

export default Loader;