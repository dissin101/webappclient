import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

interface BreadcrumbsInterface {
    className?: string
    links: {
        title: string
        path: string
    }[]
}

const Breadcrumbs: React.FC<BreadcrumbsInterface> = ({className, links}) => (
    <ul className={classNames('breadcrumbs-container', className)}>
        {links.map(({title, path}, index) => {
            return(
                <li className={'breadcrumbs-container__item'}>
                    <Link
                        className={
                            classNames(
                                'breadcrumbs-container__item-link',
                                index === links.length - 1 && 'breadcrumbs-container__item-link--active')}
                        to={path}
                    >
                        {title}
                    </Link>
                </li>
            )
        })}
    </ul>
)

export default Breadcrumbs;