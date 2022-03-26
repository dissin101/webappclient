import React from "react";
import './Input.scss';
import {IInput} from "./interface";
import classNames from "classnames";

/**
 * Компонент - поле ввода
 * @param value
 * @param onChange
 * @param className
 * @constructor
 */
const Input: React.FC<IInput> = ({value, onChange, className}) => {
    return(
        <input className={classNames('input input--error', className)} value={value} onChange={onChange}/>
    )
}

export default Input;