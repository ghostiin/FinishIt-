import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

type modalProps = {
    onClose: () => void;
}

const Modal: React.FC<modalProps> = (props) => {
    return ReactDOM.createPortal(
        <div className={ styles.modal } onClick={ props.onClose }>
            <div onClick={ (e) => e.stopPropagation() }>
                { props.children }
            </div>
        </div>, document.querySelector('#modal'))
}

export default Modal;