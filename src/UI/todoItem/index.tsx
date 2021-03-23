import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { DELETE_TODO, MODIFY_TODO, TodosContext, TOGGLE_TODO } from '../../Context/todos';
import Modal from '../modal';
import styles from './todoitem.module.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { ITodo } from '../../constants';
// import 'react-day-picker/lib/style.css'; // in gloabl.scss


export type TodoItemProps = {
    todo: ITodo,
    setTodo?: (t: ITodo) => void;
    newOne?: boolean;
    setAdding?: () => void;
    readonly?: boolean;
}


const TodoItem: React.FC<TodoItemProps> = (props) => {
    const { newOne = false, setAdding, todo } = props;
    const { readonly = false } = props;
    const { todos, dispatch } = useContext(TodosContext);
    const [showDelete, setShowDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    const toggleTodo = (id: string) => {
        dispatch({ type: TOGGLE_TODO, payload: id })
    }

    const modifyTodo = (id: string, modifyContent: ITodo) => {
        dispatch({ type: MODIFY_TODO, payload: { id, modifyContent } })
    }

    const deleteTodo = (id: string) => {
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
            <label htmlFor='radioId' onClick={ () => toggleTodo(todo._id) }></label>
            <span >
                {
                    canEdit || newOne ? (
                        <>
                            <input type="text" value={ todo.name }
                                readOnly={ readonly }
                                onChange={ (e) => {
                                    if (newOne) {
                                        props.setTodo({ ...todo, name: e.target.value })
                                    } else {
                                        modifyTodo(todo._id, { ...todo, name: e.target.value })
                                    }
                                } } ref={ inputRef } autoFocus={ newOne || canEdit }
                                onBlur={ () => {
                                    setCanEdit(false);
                                    if (newOne) {
                                        setAdding();
                                    }
                                } }
                            >
                            </input>
                        </>
                    ) : (
                        <>
                            <div onClick={ () => { setCanEdit(true) } }>{ todo.name }</div>
                        </>
                    )
                }
            </span>
        </div>
        <span className={ `${styles.menu} ${showDelete && styles['menu-left']}` }>
            <span onClick={ () => { setShowDelete(false); setShowModal(true) } }>📅</span>
            <span onClick={ () => { deleteTodo(todo._id); setShowDelete(false) } }>❌</span>
        </span>

        { showModal &&
            <Modal onClose={ () => { setShowModal(false) } }>
                <div className={ "popUp" } >
                    <div>🕓选择计划执行日期</div>
                    <DayPickerInput
                        value={ dayjs(todo.scheduleTime).format('YYYY-MM-DD') }
                        onDayChange={ day => {
                            // console.log(dayjs(day).format())
                            // modify todo
                            modifyTodo(todo._id, { ...todo, scheduleTime: dayjs(day).format() })
                        } }
                    />
                </div>
            </Modal>
        }
    </div >
}

export default TodoItem;