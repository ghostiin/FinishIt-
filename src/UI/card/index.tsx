import React from 'react';
import styles from './card.module.scss'

export type CardProps = {
    width?: number | string;
    height?: number | string;
    cStyle?: any;
}

const Card: React.FC<CardProps> = (props) => {
    const style = {
        // width: props.width || '100%',
        // height: props.height || 'auto',
        ...props.cStyle
    }
    return <div className={ styles.card } style={ style }>{ props.children || '' }</div>
}

export default Card;