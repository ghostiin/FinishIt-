import React from 'react';
import TodoItem from '../../UI/todoItem';
import styles from './todolist.module.scss';

const List = () => {

    return <div className={ styles.list }>
        <h1>今日的待办事项</h1>
        <div>
            <TodoItem >完成FinishIt基础样式设置</TodoItem>
        </div>
    </div>
}

export default List;