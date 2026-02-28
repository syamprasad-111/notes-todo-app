function TodoItem({todo, onEdit, onDelete, onToggle}){
  return(
    <div className="flex justify-between items-center bg-white shadow p-3 mb-2 rounded">
      <span
        onClick={() => onToggle(todo)}
        className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
      >
        {todo.title}
      </span>

      <div className="flex gap-3">
        <button onClick={() => onEdit(todo)} className="text-blue-600">
          ✏️</button>
        <button onClick={() => onDelete(todo._id)}
          className="text-red-600">🗑️</button>
      </div>

    </div>
  );
}

export default TodoItem;