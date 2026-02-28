import { useEffect, useState } from "react";
import API from "../api/axios";
import TodoItem from "../components/TodoItem";
import todoimg from "../assets/todoimg.png";

function TodoPage(){
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // fetching Todos
  const fetchTodos = async () => {
    try {
      const { data } = await API.get("/todos");
      setTodos(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // add Todo
  const addTodo = async () => {
    if (!text.trim()) return;

    try {
      const { data } = await API.post("/todos", {
        title: text,
      });

      setTodos((prev) => [...prev, data]);
      setText("");
    } catch (error) {
      alert("Failed to add todo");
    }
  };

  // update Todo
  const updateTodo = async () => {
    if (!text.trim()) return;

    try {
      await API.put(`/todos/${editingId}`, {
        title: text,
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === editingId
            ? { ...todo, title: text }
            : todo
        )
      );

      setEditingId(null);
      setText("");
    } catch (error) {
      alert("Failed to update todo");
    }
  };

  // delete Todo
  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      alert("Failed to delete todo");
    }
  };

  // toggle Completed task
  const toggleComplete = async (todo) => {
    try {
      await API.put(`/todos/${todo._id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed }  : t
        )
      );
    } 
    catch(error){
      alert("Failed to update todo");
    }
  };

  // start Edit
  const startEdit = (todo)=>{
    setText(todo.title);
    setEditingId(todo._id);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-3">
      {/* <h2 className="text-2xl font-bold mb-4">
        To-do List
      </h2>
      <img src={todoimg} alt="todo Logo" className="w-10 h-10"/> */}
      <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-2xl font-bold">
                        To-do List
                      </h2>
                      <img src={todoimg} alt="todo Logo" className="w-8 h-8"/>
      </div>
      {/* input task */}
      <div className="flex gap-2 mb-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={editingId ? "Editing task..."  : "Enter new task..."}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={() => editingId ? updateTodo() : addTodo()}
          className="bg-violet-600 text-white px-4 rounded"
        >Add</button>
      </div>

      {/* todo list from todoItem */}
      {todos.length===0 && (
        <p className="text-gray-500">
          No tasks yet. Add something!
        </p>
      )}
      {todos.map((todo)=>(
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={startEdit}
          onDelete={deleteTodo}
          onToggle={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TodoPage;