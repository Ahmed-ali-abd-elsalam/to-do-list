
import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';
import '../styles/AuthForm.css'; // Import the shared styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      await API.post('/auth/login', { email, password });
      navigate('/tasks');
    } catch {
      alert('Login failed');
    }
  };
  const signup = async () => {
    try {
      navigate('/signUp');
    } catch {
      alert('redirect failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={signup}>SignUp</button>
      
    </div>
  );
}
export default LoginPage;