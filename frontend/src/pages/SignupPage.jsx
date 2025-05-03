import { useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../services/api';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setphoneNumber] = useState('');
  const navigate = useNavigate();

const signup = async () => {
  try {
    await API.post('/auth/signup', { name, email, password,phone });
    navigate('/tasks');
  } catch {
    alert('Signup failed');
  }
};

  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="phoneNumber" placeholder="phoneNumber" onChange={(e) => setphoneNumber(e.target.value)} />
      <button onClick={signup}>Sign Up</button>
    </div>
  );
}

export default SignupPage;
