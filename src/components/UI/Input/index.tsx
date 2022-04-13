import React from "react";
import styles from './Input.module.scss';
import {IInput} from "./interface";
import classNames from "classnames";

/**
 * Компонент - поле ввода
 * @param value
 * @param onChange
 * @param className
 * @param type
 * @constructor
 */
const Input: React.FC<IInput> = ({
    value,
    onChange,
    className,
    type= "text"}) => {
    return(
        <input
            className={classNames(styles['input'], className)}
            value={value}
            onChange={onChange}
            type={type}
        />
    )
}

export default Input;