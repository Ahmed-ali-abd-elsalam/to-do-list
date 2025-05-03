import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';
import '../styles/TasksPage.css';
import '../styles/shared.css';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async (title = '') => {
    try {
      console.log('Fetching tasks with title:', title); // Debugging line
      const endpoint = title.trim()
        ? `/tasks/search?title=${encodeURIComponent(title)}`
        : '/tasks';
      console.log('Fetching tasks from:', endpoint); // Debugging line
      const res = await API.get(endpoint);
      setTasks(res.data);
      console.log('Fetched tasks:', res.data); // Debugging line
    } catch {
      alert('Failed to fetch tasks');
    }
  };

  const togglePending = async (task) => {
    try {
      await API.put(`/tasks/edit?id=${task._id}`, {
        Completed: !task.Completed,
      });
      fetchTasks(search); // Keep filtered list after toggle
    } catch {
      alert('Failed to update task');
    }
  };

  const logout = async () => {
    await API.post('/auth/logout');
    navigate('/');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (

<div className="page-container">
  <div className="header">
    <h2>Your Tasks</h2>
    <div className="header-buttons">
          <button onClick={() => navigate('/tasks')}>tasks</button>
    <button onClick={() => navigate('/profile')}>Profile</button>
    <button onClick={logout}>Logout</button>
    </div>
  </div>

  <div className="controls">
    <input
      type="text"
      placeholder="Search by title"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button onClick={() => fetchTasks(search)}>Search</button>
    <button onClick={() => navigate('/create-task')}>+ New Task</button>
  </div>

  <ul className="task-list">
    {Array.isArray(tasks) ? (
      tasks.map(task => {
        const due = new Date(task.dueDate);
        const now = new Date();
        const isOverdue = due < now && task.pending;
        const formattedDate = due.toLocaleDateString('en-US');

        return (
          <li key={task._id} className="task-card">
            <div className="task-info">
              <input
                type="checkbox"
                checked={task.Completed}
                onChange={() => togglePending(task)}
              />
              <span>{task.title}</span>
            </div>
            <div className={isOverdue ? 'due-date overdue' : 'due-date'}>
              Due: {formattedDate}
            </div>
          </li>
        );
      })
    ) : (
      <p>No tasks to display</p>
    )}
  </ul>
</div>

  );
}

export default TasksPage;
