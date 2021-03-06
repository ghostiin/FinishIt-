import React from 'react';
import styles from './todoitem.module.scss';

export type TodoItemProps = {
    content?: string;
}


const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { content = '' } = props;
    return <div className={ styles.todoitem }>
        <input type="radio" id='radioId' value="state"></input>
        <label htmlFor='radioId'></label>
        <span>
            { content || props.children }
        </span>
    </div>
}

export default TodoItem;