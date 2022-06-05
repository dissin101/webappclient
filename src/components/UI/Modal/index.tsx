import React from 'react';
import classNames from "classnames";
import styles from "./Modal.module.scss";
import {IModal} from "./interface";
import Icon from "../Icon";
import Button from "../Button";

const Modal = ({isVisible, header, onClose, children}: IModal) => {
    return (
        <div
            className={classNames(styles['modal-wrapper'], !isVisible && styles['modal-wrapper--hidden'])}
            onClick={onClose}
        >
            <div
                className={styles['modal']}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles['modal__header']}>
                    <h3 className={styles['modal__header-title']}>{header || ""}</h3>
                    <Button className={styles['modal__header-close']}
                            color={'info'}
                            onClick={onClose}
                    >
                        <Icon name={'close'}/>
                    </Button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;