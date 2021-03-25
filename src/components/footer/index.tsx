import React, { useContext } from 'react';
import { UserContext } from '../../Context/user';
import Button from '../../UI/button';
import { message } from '../../UI/message';
import styles from './footer.module.scss';

export type footerProps = {
    addNewOne: () => void;
}

//TODO 添加add new todo icon
const Footer: React.FC<footerProps> = (props) => {
    const { user } = useContext(UserContext)

    return (
        <div className={ styles.footer }>
            <Button onClick={ (e) => {
                e.nativeEvent.stopImmediatePropagation();
                if (user) {
                    props.addNewOne();
                } else {
                    message.error('请先登录/注册！')
                }
            } }>添加TODO</Button>
            {/* <Button>回顾</Button> */ }
        </div>
    )
}

export default Footer;