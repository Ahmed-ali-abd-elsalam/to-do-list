import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';

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

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default LoginPage;
