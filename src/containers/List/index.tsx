import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { filterTypes, FILTER_INFO_MAP, ITodo } from '../../constants';
import Button from '../../UI/button';
import Group from '../../UI/group';
import TodoItem from '../../UI/todoItem';
import styles from './todolist.module.scss';

type listProps = {
    todos: Array<ITodo>,
    filterType?: string,
}

function sortTime(a: string, b: string) {
    if (dayjs(a).isBefore(b)) {
        return -1;
    } else if (dayjs(a).isAfter(b)) {
        return 1;
    }
    return 0;
}
const List: React.FunctionComponent<listProps> = (props) => {
    const { todos, filterType = 'todo' } = props;

    const normalList = (
        <div>
            {
                todos.map(todo => {
                    return <TodoItem
                        todo={ todo }
                        key={ todo._id }
                    />
                })
            }
        </div>
    );

    const genscheduleList = () => {
        let allSchedule: { [x: string]: ITodo[]; } = {};
        todos.forEach((t: ITodo) => {
            const f = dayjs(t.scheduleTime).format('YYYY-MM-DD');
            if (!allSchedule[f]) {
                allSchedule[f] = [t];
            } else {
                allSchedule[f].push(t)
            }
        })
        return <div className={ styles.scheduleList }>
            { Object.keys(allSchedule).length ?
                Object.keys(allSchedule).sort(sortTime).map((s: string) => {
                    return (
                        <Group
                            groupName={ dayjs().isSame(s, 'date') ? '今日' : s }
                            todos={ allSchedule[s] } key={ s }
                            count={ allSchedule[s].length }
                            open={ dayjs().isSame(s, 'date') }
                        />
                    )
                }) : null
            }
        </div>
    }

    return (
        <>
            <div className={ styles.list }>
                <h1>{ FILTER_INFO_MAP[filterType || 'todo'] }</h1>
                { filterType === filterTypes.scheduled ? genscheduleList() : normalList }
                {
                    todos.length === 0 ? (<div className={ styles.empty }>🐷今天想做什么呢？</div>) : null
                }
            </div>
        </>
    )


}

export default List;