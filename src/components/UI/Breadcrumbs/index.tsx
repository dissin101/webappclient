import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Breadcrumbs.module.scss";
import {IBreadcrumbs} from "./interface";

/**
 * Компонент - хлебные крошки
 * @param className
 * @param links
 * @constructor
 */
const Breadcrumbs: React.FC<IBreadcrumbs> = ({className, links}) => (
    <ul className={classNames('box breadcrumbs-container', className)}>
        {links.map(({title, path}, index) => {
            return(
                <li className={'breadcrumbs-container__item'} key={index}>
                    <Link
                        className={
                            classNames(
                                'breadcrumbs-container__item-link',
                                index === links.length - 1 && 'breadcrumbs-container__item-link--active')}
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