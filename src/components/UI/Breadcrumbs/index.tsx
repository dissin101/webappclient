import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";
import {IBreadcrumbs} from "./interface";

/**
 * Компонент - хлебные крошки
 * @param className
 * @param links
 * @constructor
 */
const Breadcrumbs: React.FC<IBreadcrumbs> = ({className, links}) => (
    <ul className={classNames(styles['breadcrumbs-container'], 'box', className)}>
        {links.map(({title, path}, index) => {
            return(
                <li className={styles['breadcrumbs-container__item']} key={index}>
                    <Link
                        className={
                            classNames(
                                styles['breadcrumbs-container__item-link'],
                                index === links.length - 1 && styles['breadcrumbs-container__item-link--active'])}
                        to={path}
                        replace
                    >
                        {title}
                    </Link>
                </li>
            )
        })}
    </ul>
)

export default Breadcrumbs;