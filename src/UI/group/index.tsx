import React, { useState } from 'react';
import TodoItem from '../todoItem';
import styles from './group.module.scss';

type groupProps = {
    groupName: string;
    todos: Array<any>
}

const Group: React.FC<groupProps> = (props) => {
    const { groupName, todos = [] } = props;
    const [show, toggleShow] = useState(false);
    return <div className={ styles.group }>
        <div className={ styles.title } onClick={ () => { toggleShow(!show) } }>
            <div>{ groupName }</div>
            {/* <div>{ '>' }</div> */ }
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