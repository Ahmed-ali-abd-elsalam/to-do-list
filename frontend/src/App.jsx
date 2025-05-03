import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TasksPage from './pages/TasksPage';
import CreateTaskPage from './pages/createTaskPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/tasks" element={
        <ProtectedRoute>
          <TasksPage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/create-task" element={
        <ProtectedRoute>
          <CreateTaskPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
