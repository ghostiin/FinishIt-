import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Nav from './components/Nav';
import Charts from './containers/Charts';
import { TodosContext } from './Context';
import styles from './review.module.scss';
import Card from './UI/card';
import Group from './UI/group';
import TodoItem from './UI/todoItem';

type reviewProps = {

}

function genSortTime(prop: string) {
    return function sortTime(a: any, b: any) {
        if (dayjs(a[prop]).isBefore(b[prop])) {
            return -1;
        } else if (dayjs(a[prop]).isAfter(b[prop])) {
            return 1;
        }
        return 1;
    }
}


const sortCreateTime = genSortTime('createTime');
const sortScheduleTime = genSortTime('scheduleTime');

const Review: React.FC<reviewProps> = (props) => {
    const { todos } = useContext(TodosContext);
    const finished = useRef<number>(todos.filter((t: any) => t.completed).length || 0)
    const weekTodos = todos.filter((t: any) => !t.completed && dayjs().subtract(7, 'day').isBefore(t.createTime));
    const sortWeekTodos = weekTodos.sort(sortCreateTime).slice(0, 3)
    const upcomingTodos = todos.filter((t: any) => t.scheduleTime && !t.completed).sort(sortScheduleTime).slice(0, 3)

    return (<div className={ styles.review }>
        <Nav isFiltered={ true } />
        <div className={ styles.sum }>
            你已经完成
                <br />
            <span>{ finished.current }</span>件你想做的事！
            </div>
        <div className={ styles.rate }>
            完成率
                    <span>{ (finished.current * 100 / todos.length).toFixed(1) }</span>
                    %
            </div>
        <Charts todos={ todos }></Charts>
        <div className={ styles.subTitle }>
            最近7天中
            </div>
        {/* <div>
                最拖延的三件事
                {
                    sortWeekTodos.slice(0, 3).map((todo: any) => {
                        return <TodoItem
                            todo={ todo }
                            key={ todo.id }
                        />
                    })
                }
            </div> */}
        <Group
            groupName={ '💥猜猜你本周最拖延的三件未完成事项是？' }
            todos={ sortWeekTodos }
        />
        <Group
            groupName={ '🔥猜猜接下来最紧急的三件未完成事项是？' }
            todos={ upcomingTodos }
        />
    </div>
    )
}

export default Review;