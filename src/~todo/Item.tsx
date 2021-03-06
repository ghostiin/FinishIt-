import React from 'react';


const Item = (props:any)=>{

    return <div>{props.todo.state} | {props.todo.todo || 'none'}
    <button
        onClick={
            ()=>{
                props.toggleTodo(props.todo)
            }
        }
    >
    {props.todo.state==='todo'?'finish':'todo'}
    </button>
    <button 
        onClick={
            ()=>{
                props.deleteTodo(props.todo.id)
            }
        }
    >delete</button>
    </div>;
}

export default Item;