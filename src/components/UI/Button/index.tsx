import React from 'react';
import styles from './Button.module.scss';
import classNames from "classnames";
import {IButton} from "./interface";

/**
 * Компонент - кнопка
 * @param children
 * @param onClick
 * @param type
 * @param disabled
 * @param className
 * @param color
 * @constructor
 */
const Button: React.FC<IButton> = ({
    children,
    onClick,
    type,
    disabled,
    className,
    color,
    size = 'md'
    }) => {
    return (
        <button className={
                    classNames(styles[`button`],
                    color && styles[`button--${color}`],
                    styles[`button--size-${size}`],
                    className)}
                onClick={onClick}
                type={type}
                disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;