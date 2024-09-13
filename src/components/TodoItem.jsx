import { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggle = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex items-center justify-between border border-black/10 rounded-lg p-3 gap-x-3 shadow-md duration-300 ${todo.completed
                    ? "bg-green-100 border-green-200"
                    : "bg-gray-100 border-gray-200"
                }`}
        >
            {/* Checkbox for marking todo as complete */}
            <input
                type="checkbox"
                className="cursor-pointer w-5 h-5"
                checked={todo.completed}
                onChange={toggle}
            />

            {/* Editable todo text input */}
            <input
                type="text"
                className={`flex-grow p-2 rounded-md focus:outline-none transition-all duration-200 ${isTodoEditable
                    ? "border border-gray-300 bg-white"
                    : "bg-transparent border-none"
                    } ${todo.completed ? "line-through text-gray-500" : "text-black"}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit or Save Button */}
            <button
                className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm border transition duration-200 ease-in-out ${todo.completed
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable(!isTodoEditable);
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "💾" : "✏️"}
            </button>

            {/* Delete Button */}
            <button
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-white hover:bg-red-600 transition duration-200 ease-in-out"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
