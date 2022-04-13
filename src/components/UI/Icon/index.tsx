import React from 'react';
import classNames from "classnames";
import {IIcon} from "./interface";
import styles from "./Icon.module.scss";

/**
 * Компонент - иконка
 * @param name
 * @param className
 * @constructor
 */
const Icon:React.FC<IIcon> = ({name, className}) => (
    <i className={classNames(styles['icon'], 'material-icons', className)}>
        {name}
    </i>
)

export default Icon;