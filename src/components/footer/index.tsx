import React from 'react';
import Button from '../../UI/button';
import styles from './footer.module.scss';

export type footerProps = {
    addNewOne: () => void;
}

//TODO 添加add new todo icon
const Footer: React.FC<footerProps> = (props) => {
    return (
        <div className={ styles.footer }>
            <Button onClick={ (e) => {
                e.nativeEvent.stopImmediatePropagation();
                props.addNewOne();
            } }>添加TODO</Button>
            {/* <Button>回顾</Button> */ }
        </div>
    )
}

export default Footer;