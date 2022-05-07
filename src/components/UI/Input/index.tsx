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
    label,
    className,
    name,
    ...props}) => {
    return (
        <div className={styles['input-wrapper']}>
            {!!label && <label className={styles['label']} htmlFor={name}>{label}</label>}
            <input
                className={classNames(styles['input'], className)}
                id={name}
                {...props}
            />
        </div>
    )
}

export default Input;