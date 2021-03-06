import React from 'react';
import Button from '../../UI/button';
import styles from './footer.module.scss';

export type footerProps = {}

//TODO 添加add new todo icon
const Footer: React.FC<footerProps> = (props) => {
    return (
        <div className={ styles.footer }>
            <Button>回顾</Button>
            <Button>添加TODO</Button>
        </div>
    )
}

export default Footer;