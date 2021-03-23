import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { filterTypes, FILTER_TYPE } from './constants';
import { TodosContext, ADD_TODO } from './Context';
import device from 'current-device';
import List from './containers/List';
import Module from './containers/Module';
import Search from './containers/Search';
import Footer from './components/footer';
import TodoItem from './UI/todoItem';

type homeProps = {
}
type todoType = {
    id: number,
    name: string,
    completed: boolean,
    createTime: string,
    scheduleTime: string
}

const Home: React.FunctionComponent<homeProps> = props => {
    const { search } = useLocation();
    const filter = new URLSearchParams(search).get('filter');
    const IS_FILTERED = !!(filter && FILTER_TYPE[filter]);
    const { todos, dispatch } = useContext(TodosContext);
    const [isAdding, setIsAdding] = useState(false);
    const [data, setData] = useState({
        [filterTypes.all]: todos.length,
        [filterTypes.flag]: todos.filter((t: todoType) => {
            return !t.completed && dayjs().isAfter(t.createTime, 'date')
        }).length,
        [filterTypes.scheduled]: todos.filter((t: todoType) => {
            return (t.scheduleTime && (dayjs().isBefore(t.scheduleTime, 'date') || dayjs().isSame(t.scheduleTime, 'date')))
        }).length,
    })

    const [newTodo, setNewTodo] = useState<any>({ name: '', id: uuidv4(), completed: false })

    const filterTodos = () => {
        switch (filter) {
            case filterTypes.all:
                return todos;
            case filterTypes.flag:
                return todos.filter((t: todoType) => {
                    return !t.completed && dayjs().isAfter(t.createTime, 'date')
                });
            case filterTypes.scheduled:
                return todos.filter((t: todoType) => {
                    return (t.scheduleTime && (dayjs().isBefore(t.scheduleTime, 'date') || dayjs().isSame(t.scheduleTime, 'date')))
                });
            default:
                //返回today's todo
                return todos.filter((t: todoType) => {
                    return dayjs().isSame(t.createTime, 'date')
                });
        }
    }
    const addTodo = (todo: any) => {
        dispatch({ type: ADD_TODO, payload: todo })
    }


    useEffect(() => {
        const fn = () => {
            setIsAdding(false);
        }
        document.addEventListener('click', fn)
        return () => document.removeEventListener('click', fn)
    }, [])

    useEffect(() => {
        console.log('setitem'); //TODO
        window.localStorage.setItem('todos', JSON.stringify(todos))
        setData({
            [filterTypes.all]: todos.length,
            [filterTypes.flag]: todos.filter((t: todoType) => {
                return !t.completed && dayjs().isAfter(t.createTime, 'date')
            }).length,
            [filterTypes.scheduled]: todos.filter((t: todoType) => {
                return (t.scheduleTime && (dayjs().isBefore(t.scheduleTime, 'date') || dayjs().isSame(t.scheduleTime, 'date')))
            }).length,
        })
    }, [todos.length, todos])

    useEffect(() => {
        if (newTodo.name && !isAdding) {
            addTodo({ ...newTodo, createTime: dayjs().format(), flag: false, scheduleTime: dayjs().format() });
            setNewTodo({ name: '', id: uuidv4(), completed: false })
        }
    }, [isAdding])

    const Mobile = (
        <>
            <Search isFiltered={ IS_FILTERED } />
            {
                !IS_FILTERED && <Module data={ data } />
            }
            <List todos={ filterTodos() } filterType={ filter } />
            {
                isAdding && <TodoItem
                    newOne={ isAdding }
                    todo={ newTodo }
                    setTodo={ (modifyContent: any) => {
                        setNewTodo({ ...newTodo, ...modifyContent })
                    } }
                    setAdding={ () => { setIsAdding(false) } }
                />
            }
            <Footer addNewOne={ () => { setIsAdding(true) } } />
        </>
    );

    //TODO PC兼容
    const Desktop = (
        <>
            <div className={ 'pc' }>
                would be desktop
            </div>
        </>
    );
    return device.type === 'mobile' ? Mobile : Desktop;
}

export default Home;