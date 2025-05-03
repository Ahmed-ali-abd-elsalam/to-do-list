import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';
import '../styles/CreateTaskPage.css';
function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const createTask = async () => {
    try {
      await API.post('/tasks/create', { title,description,dueDate });
      navigate('/tasks');
    } catch (err) {
      alert('Failed to create task',err.message);
    }
  };
    const logout = async () => {
    await API.post('/auth/logout');
    navigate('/');
  };

  return (
     <div className="page-container">
      <div className="header">
        <h2>Create New Task</h2>
        <div className="header-buttons">
              <button onClick={() => navigate('/tasks')}>tasks</button>
    <button onClick={() => navigate('/profile')}>Profile</button>
    <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="form-container">
        <label>Title</label>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button onClick={createTask}>Create</button>
        <button onClick={() => navigate('/tasks')}>Back to tasks</button>
      </div>
    </div>
  );
}

export default CreateTaskPage;
