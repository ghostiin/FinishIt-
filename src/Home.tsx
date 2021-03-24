import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { filterTypes, FILTER_TYPE, IData, ITodo } from './constants';
import { TodosContext, ADD_TODO } from './Context/todos';
import device from 'current-device';
import List from './containers/List';
import Module from './containers/Module';
import Search from './containers/Search';
import Footer from './components/footer';
import TodoItem from './UI/todoItem';
import { message } from './UI/message';
import { createTodo } from './apis/request';

type homeProps = {}

const Home: React.FunctionComponent<homeProps> = props => {
    const { search } = useLocation();
    const filter = new URLSearchParams(search).get('filter');
    const IS_FILTERED = !!(filter && FILTER_TYPE[filter]);
    const { todos, dispatch } = useContext(TodosContext);
    const [isAdding, setIsAdding] = useState(false);
    const [data, setData] = useState<IData>({
        [filterTypes.all]: todos.length,
        [filterTypes.flag]: todos.filter((t: ITodo) => {
            return !t.completed && dayjs().isAfter(t.scheduleTime, 'date')
        }).length,
        [filterTypes.scheduled]: todos.filter((t: ITodo) => {
            return (t.scheduleTime && (dayjs().isBefore(t.scheduleTime, 'date') || dayjs().isSame(t.scheduleTime, 'date')))
        }).length,
    })

    const [newTodo, setNewTodo] = useState<ITodo>({
        name: '',
        completed: false
    })

    const filterTodos = () => {
        switch (filter) {
            case filterTypes.all:
                return todos;
            case filterTypes.flag:
                return todos.filter((t: ITodo) => {
                    return !t.completed && dayjs().isAfter(t.scheduleTime, 'date')
                });
            case filterTypes.scheduled:
                return todos.filter((t: ITodo) => {
                    return (t.scheduleTime && (dayjs().isBefore(t.scheduleTime, 'date') || dayjs().isSame(t.scheduleTime, 'date')))
                });
            default:
                //返回today's todo
                return todos.filter((t: ITodo) => {
                    return dayjs().isSame(t.scheduleTime, 'date')
                });
        }
    }

    const addTodo = async (todo: ITodo) => {
        try {
            const resp: any = await createTodo(todo);
            dispatch({ type: ADD_TODO, payload: resp })
            setNewTodo({ name: '', completed: false })
        } catch (err) {
            message.error('无法添加新事项！')
        }

    }


    useEffect(() => {
        const fn = () => {
            setIsAdding(false);
        }
        document.addEventListener('click', fn)
        return () => document.removeEventListener('click', fn)
    }, [])

    useEffect(() => {
        // console.log('setitem'); 
        // window.localStorage.setItem('todos', JSON.stringify(todos))
        setData({
            [filterTypes.all]: todos.length,
            [filterTypes.flag]: todos.filter((t: ITodo) => {
                return !t.completed && dayjs().isAfter(t.scheduleTime, 'date')
            }).length,
            [filterTypes.scheduled]: todos.filter((t: ITodo) => {
                return (t.scheduleTime && (dayjs().isBefore(t.scheduleTime, 'date') || dayjs().isSame(t.scheduleTime, 'date')))
            }).length,
        })
    }, [todos.length, todos])

    useEffect(() => {
        if (newTodo.name && !isAdding) {
            addTodo({ ...newTodo, flag: false, scheduleTime: dayjs().format() }); //默认schedutime为添加时间
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
                    setTodo={ (modifyContent: ITodo) => {
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