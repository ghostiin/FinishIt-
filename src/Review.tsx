import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Nav from './components/Nav';
import { ITodo } from './constants';
import Charts from './containers/Charts';
import { TodosContext } from './Context/todos';
import styles from './review.module.scss';
import Group from './UI/group';

type reviewProps = {

}

function genSortTime(prop: string) {
    return function sortTime(a: { [key: string]: any }, b: { [key: string]: any }) {
        if (dayjs(a[prop]).isBefore(b[prop])) {
            return -1;
        } else if (dayjs(a[prop]).isAfter(b[prop])) {
            return 1;
        }
        return 0;
    }
}


const sortCreateTime = genSortTime('createdAt');
const sortScheduleTime = genSortTime('scheduleTime');

const Review: React.FC<reviewProps> = (props) => {
    const { todos } = useContext(TodosContext);
    const finished = useRef<number>(Array.isArray(todos) ? todos.filter((t: ITodo) => t.completed).length : 0)
    const weekTodos = todos.filter((t: ITodo) => !t.completed && dayjs().subtract(7, 'day').isBefore(t.scheduleTime, 'date') && dayjs().isAfter(t.scheduleTime, 'date'));
    const sortWeekTodos = weekTodos.sort(sortCreateTime).slice(0, 3)
    const upcomingTodos = todos.filter((t: ITodo) => dayjs().isBefore(t.scheduleTime, 'date') && !t.completed).sort(sortScheduleTime).slice(0, 3)


    return (<div className={ styles.review }>
        <Nav isFiltered={ true } />
        <div className={ styles.sum }>
            你已经完成
                <br />
            <span>{ finished.current }</span>件你想做的事！
            </div>
        <div className={ styles.rate }>
            {
                todos.length ? (
                    <>
                        完成率
                        <span>{ (finished.current * 100 / todos.length).toFixed(1) }</span>%
                    </>
                ) : <>从完成一件小事开始获得简单的快乐</>
            }

        </div>
        {todos.length ?
            <>
                <Charts todos={ todos } />
            </> : null }
        <div className={ styles.subTitle }>
            最近7天中
            </div>
        {sortWeekTodos.length ? <Group
            groupName={ '💥7天内最拖延的三件未完成事项是？' }
            todos={ sortWeekTodos }
        /> : null }
        {upcomingTodos.length ? <Group
            groupName={ '🔥接下来最紧急的三件未完成事项是？' }
            todos={ upcomingTodos }
        /> : null }
        {
            !upcomingTodos.length && !sortWeekTodos.length ?
                <div className={ styles.empty }>
                    🔮请多使用一段时间来解锁神秘区域吧~
            </div> : null
        }
    </div>
    )
}

export default Review;