import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { DELETE_TODO, MODIFY_TODO, TodosContext, TOGGLE_TODO } from '../../Context';
import styles from './todoitem.module.scss';

export type TodoItemProps = {
    todo: { name: string, id: number, completed: boolean, scheduleTime: string, createTime: string }
    setTodo?: any;
    newOne?: boolean;
    readonly?: boolean;
}


const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { newOne = false, todo = { name: '', id: dayjs().unix(), completed: false, createTime: dayjs().format(), flag: false, scheduleTime: '' } } = props;
    const { readonly = false } = props;
    const { todos, dispatch } = useContext(TodosContext);
    const [showDelete, setShowDelete] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement>();

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        if (down && mx < -8) {
            setShowDelete(true)
        } else if (down && mx > 8) {
            setShowDelete(false)
        }
    })
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

    const deleteTodo = (id: number) => {
        dispatch({ type: DELETE_TODO, payload: id })
    }

    return <div className={ styles.todoitem } onClick={ (e) => {
        if (newOne || canEdit) {
            e.nativeEvent.stopImmediatePropagation()
        }
    } }
        { ...bind() }
    >
        <div className={ `${styles.item}  ${showDelete && styles.swipe} ` }>
            <input type="radio" id='radioId' value="state" checked={ todo.completed }
                onChange={ () => { } }
            ></input>
            <label htmlFor='radioId' onClick={ () => toggleTodo(todo.id) }></label>
            <span >

                {
                    canEdit || newOne ? (
                        <input type="text" value={ todo.name }
                            readOnly={ readonly }
                            onChange={ (e) => {
                                if (newOne) {
                                    props.setTodo({ name: e.target.value })
                                } else {
                                    modifyTodo(todo.id, { name: e.target.value })
                                }
                            } } ref={ inputRef } autoFocus={ newOne || canEdit }
                            onBlur={ () => { setCanEdit(false) } }
                        >
                        </input>
                    ) : (
                        <div onClick={ () => { setCanEdit(true) } }>{ todo.name }</div>
                    )
                }


            </span>
        </div>

        <span className={ `${styles.menu} ${showDelete && styles['menu-in']}` }
            onClick={ () => { deleteTodo(todo.id); setShowDelete(false) } }
        >
            删除
        </span>
        {/* <span>
            { todo.name }
        </span> */}
    </div >
}

export default TodoItem;