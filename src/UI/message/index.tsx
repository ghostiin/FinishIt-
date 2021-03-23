import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom"
import { IMessage, MessageApi, MessageType } from '../../constants';
import Message from './message';
import { v4 as uuidv4 } from 'uuid';
import styles from './message.module.scss';

let add: (m: IMessage) => void; //供messageapi调用

const MessageContainer: React.FC = () => {
    const [messageArr, setMessageArr] = useState<IMessage[]>([]);
    const MAX_ARR_LEN = 3;
    const TIME_OUT = 3000; //3s 后message小时

    const remove = (rm: IMessage) => {
        const { key } = rm;
        setMessageArr((prev) => (
            prev.filter((m: IMessage) => key !== m.key)
        ))
    }

    add = (am: IMessage) => {
        setMessageArr((prev) => [...prev, am]) // 保证前面的state更新完后再添加新的，保证更新不会被吞

        setTimeout(() => {
            remove(am)
        }, TIME_OUT)
    }

    useEffect(() => {
        if (messageArr.length > MAX_ARR_LEN) { //message数量超过时删除最初的message
            const [fm] = messageArr;
            remove(fm);
        }
    }, [messageArr])

    // return ReactDOM.createPortal(
    return (
        <div className={ styles.container }>
            {
                messageArr.map((m: IMessage) => {
                    return <Message message={ m } key={ m.key }></Message>
                })
            }
        </div>)
}

export default MessageContainer;

ReactDOM.render(<MessageContainer />, document.querySelector('#message'))


export const message: MessageApi = {
    error: function (warn) {
        add({
            message: warn,
            key: uuidv4(),
            type: MessageType.warn
        })
    }
}


