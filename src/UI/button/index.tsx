import React from 'react';
import styles from './button.module.scss'

export type ButtonProps = {
    onClick?: (e?: any) => void
}

const Button: React.FC<ButtonProps> = (props) => {
    return <div className={ styles.btn } onClick={ props.onClick }>{ props.children || '' }</div>
}

export default Button;