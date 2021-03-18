import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MODIFY_TODO, TodosContext, TOGGLE_TODO } from '../../Context';
import styles from './todoitem.module.scss';

export type TodoItemProps = {
    todo: { name: string, id: number, completed: boolean, scheduleTime: string, createTime: string }
    setTodo?: any;
    newOne?: boolean;
}


const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { newOne = false, todo = { name: '', id: dayjs().unix(), completed: false, createTime: dayjs().format(), flag: false, scheduleTime: '' } } = props;
    const { todos, dispatch } = useContext(TodosContext);
    const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        if (newOne) {
            inputRef.current.focus();
        }
    }, [])

    const toggleTodo = (id: number) => {
        dispatch({ type: TOGGLE_TODO, payload: id })
    }

    const modifyTodo = (id: number, modifyContent: any) => {
        dispatch({ type: MODIFY_TODO, payload: { id, modifyContent } })
    }

    return <div className={ styles.todoitem } onClick={ (e) => {
        if (newOne) {
            e.nativeEvent.stopImmediatePropagation()
        }
    } }>
        <input type="radio" id='radioId' value="state" checked={ todo.completed }
            onChange={ () => { } }
        ></input>
        <label htmlFor='radioId' onClick={ () => toggleTodo(todo.id) }></label>
        <span onClick={ () => { } }>
            <input type="text" value={ todo.name } onChange={ (e) => {
                if (newOne) {
                    props.setTodo({ name: e.target.value })
                } else {
                    modifyTodo(todo.id, { name: e.target.value })
                }
            } } ref={ inputRef } autoFocus={ newOne }>
            </input>
        </span>
        {/* <span>
            { todo.name }
        </span> */}
    </div>
}

export default TodoItem;