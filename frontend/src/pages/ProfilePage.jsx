import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import API from '../services/api';
import '../styles/ProfilePage.css';
import '../styles/shared.css';

function ProfilePage() {
  const [user, setUser] = useState({});
  const [newName, setnewName] = useState('');  
  const [newEmail, setnewEmail] = useState('');
  const [newPhone, setnewPhone] = useState('');
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await API.get('/auth/getuser');
    setUser(res.data);
    setnewName(res.data.name);
    setnewEmail(res.data.email);
    setnewPhone(res.data.phone);
  };
      const logout = async () => {
    await API.post('/auth/logout');
    navigate('/');
  };

  const updateProfile = async () => {
    const res = await API.put('/auth/edit', { name: newName, email: newEmail, phoneNumber: newPhone });
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="profile-container">
  <div className="header-buttons">
    <button onClick={() => navigate('/tasks')}>tasks</button>
    <button onClick={() => navigate('/profile')}>Profile</button>
    <button onClick={logout}>Logout</button>
</div>
      <div className="profile-card">
        <h2>Your Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone Number:</strong> {user.phone}</p>

        <input
          value={newName}
          onChange={(e) => setnewName(e.target.value)}
          placeholder="New Name"
        />
        <input
          value={newEmail}
          onChange={(e) => setnewEmail(e.target.value)}
          placeholder="New Email"
        />
        <input
          value={newPhone}
          onChange={(e) => setnewPhone(e.target.value)}
          placeholder="New Phone"
        />

        <button onClick={updateProfile}>Update Profile</button>
      </div>
    </div>
  );
}

export default ProfilePage;
