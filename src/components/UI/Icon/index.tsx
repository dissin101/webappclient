import React from 'react';
import classNames from "classnames";
import {IIcon} from "./interface";

/**
 * Компонент - иконка
 * @param name
 * @param className
 * @constructor
 */
const Icon:React.FC<IIcon> = ({name, className}) => (
    <i className={classNames('icon material-icons', className)}>
        {name}
    </i>
)

export default Icon;