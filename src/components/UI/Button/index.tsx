import React from 'react';
import './Button.scss';
import classNames from "classnames";

interface ButtonInterface {
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
    className?: string
    color?: 'primary' | 'info' | 'success'
}

const Button: React.FC<ButtonInterface> = ({children, onClick, type, disabled, className, color}) => {
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