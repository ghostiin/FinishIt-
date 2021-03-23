import React from 'react';
import { IMessage, MessageType } from '../../constants';
import styles from './message.module.scss';

const Message: React.FC<{ message: IMessage }> = ({ message: m }) => {
    return (<div className={ styles.message }>
        <span>{ m.type === MessageType.warn ? '❌' : '✅' }</span>
        { m.message }
    </div>)
}

export default Message;