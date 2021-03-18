import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { filterTypes, FILTER_TYPE } from './constants';
import { TodosContext, ADD_TODO } from './Context';
import device from 'current-device';
import List from './containers/List';
import Module from './containers/Module';
import Search from './containers/Search';
import Nav from './components/Nav';
import Footer from './components/footer';
import TodoItem from './UI/todoItem';

type homeProps = {
}
type todoType = {
    id: number,
    name: string,
    completed: boolean,
    createTime: string,
}

const Home: React.FunctionComponent<homeProps> = props => {
    const { search } = useLocation();
    const filter = new URLSearchParams(search).get('filter')
    const IS_FILTERED = !!(filter && FILTER_TYPE[filter])
    const { todos, dispatch } = useContext(TodosContext);
    const [isAdding, setIsAdding] = useState(false);
    const [newTodo, setNewTodo] = useState<any>({ name: '', id: dayjs().unix(), completed: false })

    const filterTodos = () => {
        switch (filter) {
            case filterTypes.all:
                return todos;
            //TODO 添加其他filter
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
        window.localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos.length, todos])

    useEffect(() => {
        if (newTodo.name && !isAdding) {
            addTodo({ ...newTodo, createTime: dayjs().format(), flag: false, scheduleTime: '' });
            setNewTodo({ name: '', id: dayjs().unix(), completed: false })
        }
    }, [isAdding])

    const Mobile = (
        <>
            <Nav isFiltered={ !!IS_FILTERED } />
            {
                !IS_FILTERED &&
                (<>
                    <Search />
                    <Module />
                </>)
            }
            <List todos={ filterTodos() } filterType={ filter } />
            {
                isAdding && <TodoItem
                    newOne={ isAdding }
                    todo={ newTodo }
                    setTodo={ (modifyContent: any) => {
                        setNewTodo({ ...newTodo, ...modifyContent })
                    } } />
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