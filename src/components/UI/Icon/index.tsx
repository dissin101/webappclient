import React from 'react';
import classNames from "classnames";

interface IconInterface {
    name: string
    className?: string
}

const Icon:React.FC<IconInterface> = ({name, className}) => (
    <i className={classNames('icon material-icons', className)}>
        {name}
    </i>
)

export default Icon;