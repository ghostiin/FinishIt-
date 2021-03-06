import React from 'react';
import styles from './button.module.scss'

export type ButtonProps = {
}

const Button: React.FC<ButtonProps> = (props) => {
    return <div className={ styles.btn }>{ props.children || '' }</div>
}

export default Button;