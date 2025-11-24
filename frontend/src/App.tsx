import { useState, useEffect } from "react";
import "./App.css";

// const API_URL = import.meta.env.VITE_API_URL;

type todo = {
  id: number;
  description: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<todo[]>([]);
  const [description, setDescription] = useState("");

  // Obtener todos
  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  // Crear nuevo todo
  const addTodo = async () => {
    if (!description.trim()) return;
    const res = await fetch('/api/todos', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setDescription("");
  };

  // Cambiar estado (toggle)
  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  // Eliminar todo
  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    console.log("Fetching todos from:", '/api/todos');
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <h1>📝 Tareas pendientes </h1>
      <div className="todo-input">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={addTodo}>Agregar</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 && <p>No hay tareas aún ✨</p>}
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "done" : ""}>
            <span onClick={() => toggleTodo(todo.id, todo.completed)}>
              {todo.description}
            </span>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
