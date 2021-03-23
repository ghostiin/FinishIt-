import React, { useState } from 'react';
import TodoItem from '../todoItem';
import styles from './group.module.scss';

type groupProps = {
    groupName: string;
    todos: Array<any>;
    count?: number;
    open?: boolean;
}

const Group: React.FC<groupProps> = (props) => {
    const { groupName, todos = [], open = false, count = null } = props;
    const [show, toggleShow] = useState(open);
    return <div className={ styles.group }>
        <div className={ styles.title } onClick={ () => { toggleShow(!show) } }>
            <div >{ groupName }</div>
            <div>{ count }</div>
        </div>
        { show && (<div>
            {
                todos.map(todo => {
                    return <TodoItem
                        todo={ todo }
                        key={ todo.id }
                    />
                })
            }
        </div>) }
    </div>
}

export default Group;