import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { DELETE_TODO, MODIFY_TODO, TodosContext, TOGGLE_TODO } from '../../Context/todos';
import Modal from '../modal';
import styles from './todoitem.module.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { ITodo } from '../../constants';
import { completeTodo, deleteTodo, updateTodo } from '../../apis/request';
import { message } from '../message';
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
    const { dispatch } = useContext(TodosContext);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [modifyTemp, setModifyTemp] = useState<ITodo>(todo);
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

    const toggleTodo = async (id: string, status: boolean) => {
        try {
            const resp: any = await completeTodo(id, !status)
            dispatch({ type: TOGGLE_TODO, payload: id })
        } catch (err) {
            message.error('出了一点小问题...')
        }
    }

    const modifyTodo = async (modTodo: ITodo) => {
        try {
            const resp: any = await updateTodo(modTodo);
            // console.log(resp)
            dispatch({ type: MODIFY_TODO, payload: resp })
            setModifyTemp(resp);
        } catch (err) {
            message.error('出了一点小问题...')
        }

    }

    const delTodo = async (id: string) => {
        try {
            const resp: any = await deleteTodo(id);
            dispatch({ type: DELETE_TODO, payload: id })
        } catch (err) {
            message.error('出了一点小问题...')
        }

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
            <label htmlFor='radioId' onClick={ async () => { await toggleTodo(todo._id, todo.completed) } }></label>
            <span >
                {
                    canEdit || newOne ? (
                        <>
                            <input type="text"
                                value={ modifyTemp.name }
                                readOnly={ readonly }
                                onChange={ (e) => {
                                    if (newOne) {
                                        props.setTodo({ ...todo, name: e.target.value })
                                    }
                                    setModifyTemp({ ...todo, name: e.target.value });
                                }
                                }
                                ref={ inputRef } autoFocus={ newOne || canEdit }
                                onBlur={ async () => {
                                    setCanEdit(false);
                                    if (newOne) {
                                        setAdding();
                                    } else if (modifyTemp.name !== todo.name) { //真正修改才会发送req
                                        await modifyTodo(modifyTemp); // 失去焦点时才发送修改req 避免发送过多req
                                    }
                                } }
                            >
                            </input>
                        </>
                    ) : (
                        <>
                            <div onClick={ () => { setCanEdit(true) } }>{ modifyTemp.name }</div>
                        </>
                    )
                }
            </span>
        </div>
        <span className={ `${styles.menu} ${showDelete && styles['menu-left']}` }>
            <span onClick={ () => { setShowDelete(false); setShowModal(true) } }>📅</span>
            <span onClick={ async () => { await delTodo(todo._id); setShowDelete(false) } }>❌</span>
        </span>

        { showModal &&
            <Modal onClose={ () => { setShowModal(false) } }>
                <div className={ "popUp" } >
                    <div>🕓选择计划执行日期</div>
                    <DayPickerInput
                        value={ dayjs(todo.scheduleTime).format('YYYY-MM-DD') }
                        onDayChange={ async (day) => {
                            // console.log(dayjs(day).format())
                            // modify todo
                            await modifyTodo({ ...modifyTemp, scheduleTime: dayjs(day).format() })
                        } }
                    />
                </div>
            </Modal>
        }
    </div >
}

export default TodoItem;