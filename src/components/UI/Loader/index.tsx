import React from 'react';
import "./Loader.scss";
import classNames from "classnames";

interface ILoader {
    className?: string
}

const Loader = ({className}: ILoader) => {
    return (
        <div className={classNames('loader', className)}/>
    );
};

export default Loader;