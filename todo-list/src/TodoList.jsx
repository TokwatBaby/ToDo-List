import React, { useRef, useState } from 'react';
import './TodoList.css';
import { ClipboardCheck } from "lucide-react";
import { CircleCheckBig } from 'lucide-react';
import { Circle } from 'lucide-react';
import { Trash2 } from "lucide-react";

const TodoList = () => {

    const [todoList, setTodoList] = useState([]);
    const inputRef = useRef();

    const add = ()=> {
        const inputText = inputRef.current.value.trim();

        if (inputText === "") return null;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isDone: false,
        }
        setTodoList((prev)=> [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const toggle = (id) => {
        setTodoList((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, isDone: !item.isDone } : item
        )
        );
    };

    const remove = (id) => {
        setTodoList((prev) => prev.filter((item) => item.id !== id));
    };

    return (

        <div className="card">
            <div className="header">
                <ClipboardCheck size={32}/>
                <h1>To-Do List</h1>
            </div>
            <div className='handle'>
                <input ref={inputRef} type="text" placeholder='Add your To-do List Here!' />
                <button onClick={add} className="">Add +</button>
            </div>
            <div className='container'>
                {todoList.length === 0 ? (
                    <p className="no-tasks">No tasks at the moment</p>
                ) : (
                    todoList.map((item) => (
                    <div key={item.id} className="list-tasks">
                        <div className="toggle-icon" onClick={() => toggle(item.id)}>
                            {item.isDone ? <CircleCheckBig size={20} color='#007BFF' /> : <Circle size={20} />}
                        </div>
                        <div className='tasks'>
                            <p className={item.isDone ? 'done' : ''}>{item.text}</p>
                        </div>
                        <div className="delete-icon" onClick={() => remove(item.id)}>
                            <Trash2 size={20} color="#FF0000" />
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
        
    )

}

export default TodoList
