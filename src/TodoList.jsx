import React, { useState } from 'react';

function TodoList({ todos, updateTodo, deleteTodo }) {
  const [filter, setFilter] = useState('All');
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentTodo, setCurrentTodo] = useState({ name: '', description: '' });

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });

  const handleStatusChange = (index, status) => {
    const updatedTodo = { ...todos[index], status };
    updateTodo(index, updatedTodo);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setCurrentTodo({
      name: todos[index].name,
      description: todos[index].description,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const saveEdit = (index) => {
    updateTodo(index, { ...todos[index], ...currentTodo });
    setEditingIndex(null);
  };

  return (
    <div className="todo-list">
      <div className="filter">
        <label>Status Filter :</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      <div className="todos">
        {filteredTodos.map((todo, index) => (
          <div key={index} className="todo-card">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={currentTodo.name}
                  onChange={handleEditChange}
                  className="edit-input"
                />
                <input
                  type="text"
                  name="description"
                  value={currentTodo.description}
                  onChange={handleEditChange}
                  className="edit-input"
                />
                <button onClick={() => saveEdit(index)} className="save">Save</button>
                <button onClick={() => setEditingIndex(null)} className="cancel">Cancel</button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {todo.name}</p>
                <p><strong>Description:</strong> {todo.description}</p>
                <p>
                  <strong>Status:</strong> 
                  <select 
                    value={todo.status} 
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="Not Completed">Not Completed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </p>
                <button onClick={() => startEditing(index)} className="edit">Edit</button>
                <button onClick={() => deleteTodo(index)} className="delete">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;


