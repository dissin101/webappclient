import React from 'react';
import './Button.scss';
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
const Button: React.FC<IButton> = ({children, onClick, type, disabled, className, color}) => {
    return (
        <button className={classNames(`button`, color && [` button--${color}`], className)}
                onClick={onClick}
                type={type}
                disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;