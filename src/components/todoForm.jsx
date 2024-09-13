import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;
        addTodo({ todo: todo, completed: false });
        setTodo("");
    }

    return (
        <form onSubmit={add} className="flex items-center gap-2 bg-white/10 p-4 rounded-lg shadow-lg">
            <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Write Todo..."
                className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 text-black"
            />
            <button 
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-lg shadow-md hover:from-green-600 hover:to-teal-500 transition duration-300 ease-in-out"
            >
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;
