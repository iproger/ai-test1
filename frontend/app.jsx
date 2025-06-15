const { useState, useEffect } = React;

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const statuses = ['TODO', 'IN_PROGRESS', 'DONE'];

  useEffect(() => {
    fetch('/todos')
      .then(r => r.json())
      .then(setTodos);
  }, []);

  function addTodo() {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
      .then(r => r.json())
      .then(todo => setTodos(todos.concat(todo)));
    setInput('');
  }

  function toggle(todo) {
    fetch(`/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, completed: !todo.completed })
    })
      .then(r => r.json())
      .then(updated => setTodos(todos.map(t => t.id === updated.id ? updated : t)));
  }

  function updateStatus(todo, status) {
    fetch(`/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, status })
    })
      .then(r => r.json())
      .then(updated => setTodos(todos.map(t => t.id === updated.id ? updated : t)));
  }

  function uploadFile(id, file) {
    const data = new FormData();
    data.append('file', file);
    fetch(`/todos/${id}/attachment`, {
      method: 'POST',
      body: data
    })
      .then(r => r.json())
      .then(updated => setTodos(todos.map(t => t.id === updated.id ? updated : t)));
  }

  function remove(id) {
    fetch(`/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(t => t.id !== id)));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'done' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggle(todo)} />
            {todo.title}
            <select value={todo.status} onChange={e => updateStatus(todo, e.target.value)}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input type="file" onChange={e => uploadFile(todo.id, e.target.files[0])} />
            <button onClick={() => remove(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
