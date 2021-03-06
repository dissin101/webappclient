import React from "react";
import './Input.scss';
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
            className={classNames('input input--error', className)}
            value={value}
            onChange={onChange}
            type={type}
        />
    )
}

export default Input;