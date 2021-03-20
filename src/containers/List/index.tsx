import React from 'react';
import { filterTypes, FILTER_INFO_MAP } from '../../constants';
import Button from '../../UI/button';
import TodoItem from '../../UI/todoItem';
import styles from './todolist.module.scss';

type listProps = {
    todos: Array<any>,
    filterType?: string,
}

const List: React.FunctionComponent<listProps> = (props) => {
    const { todos, filterType = 'todo' } = props;
    return (
        <>
            <div className={ styles.list }>
                <h1>{ FILTER_INFO_MAP[filterType || 'todo'] }</h1>
                <div>
                    {
                        todos.map(todo => {
                            return <TodoItem
                                todo={ todo }
                                key={ todo.id }
                            />
                        })
                    }
                </div>

            </div>
        </>
    );
}

export default List;