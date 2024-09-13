import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/todoForm';
import { TodoProvider } from './context';
import TodoItem from './components/todoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); 

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
    // Show success alert for update
    setAlertMessage("Todo updated successfully!");
    setTimeout(() => setAlertMessage(""), 1000);
  };

  const deleteTodo = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      setTodos((prev) => prev.filter((item) => item.id !== id));
      setAlertMessage("Todo deleted successfully!");
      setTimeout(() => setAlertMessage(""), 1000);
    }
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="px-2 bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen py-8 text-gray-200">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-6 py-5 bg-gray-800">
          <h1 className="text-4xl font-bold text-center mb-6">Manage Your Todos</h1>

          {/* Alert Message */}
          {alertMessage && (
            <div className="mb-4 text-center text-green-500">
              {alertMessage}
            </div>
          )}

          {/* Todo Form */}
          <TodoForm />

          {/* Todo List */}
          <div className="mt-8 space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400">No Todos. Add some tasks!</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
