import React, { useState } from 'react';
import Item from './Item';
import { hashCode, omit } from '../utils';
// import styles from './TodoMain.module.scss';
import styled, { css } from 'astroturf/react';

// const To = styled('div')`
//     color:red;
// `
// const styles = css`
//   .test {
//     color: red;
//     font-size: 30px;
//   }
// `;

export default () => {
    const [ids, setIds] = useState([]);
    const [list, setList] = useState<{ [key: number]: any }>({});
    const [todo, setTodo] = useState<{ id: number; todo: string; state: string } | null>(null);

    const toggleTodo = (todo: any) => {
        const newTodo = { ...todo, state: todo.state === 'todo' ? 'compeleted' : 'todo' };
        setList({ ...list, [todo.id]: newTodo });
        // console.log(todo);
    };

    const deleteTodo = (id: number) => {
        const newList = omit(list, [id]);
        console.log(newList);
        setList(newList);
        const newIds = ids.filter((aid) => aid !== id);
        setIds(newIds);
    };

    return (
        // <div className={ styles.test }>
        <div>
            todo app -finish it!!!
            <div>
                <input
                    type='text'
                    placeholder='add todo111'
                    value={ todo ? todo.todo : '' }
                    onChange={ (e) => {
                        // console.log(e.target.value)
                        const v: string = e.target.value;
                        setTodo({
                            id: hashCode(v),
                            todo: v,
                            state: 'todo'
                        });
                    } }
                />
                <button
                    onClick={ () => {
                        if (todo && Object.keys(todo).length) {
                            const newList = { ...list, [todo.id]: todo };
                            setList(newList);
                            if (Object.keys(newList).length > Object.keys(ids).length) {
                                setIds([...ids, todo.id]);
                            }
                        }
                        setTodo(null);
                    } }
                >
                    add
				</button>
            </div>
            <div>
                { ids.length ? (
                    ids.map((id) => {
                        const t = list[id];
                        return <Item key={ id } todo={ t } toggleTodo={ toggleTodo } deleteTodo={ deleteTodo } />;
                    })
                ) : (
                    '立即添加todo1111'
                ) }
            </div>
        </div>
    );
};
