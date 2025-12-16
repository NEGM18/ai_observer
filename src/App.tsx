import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import StudentDashboard from './pages/student/StudentDashboard';
import TestScreen from './pages/student/TestScreen';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import CreateTest from './pages/teacher/CreateTest';
import TestResults from './pages/teacher/TestResults';
import { authService } from './services/authService';
import { UserRole } from './types';

// Simple route guard
const ProtectedRoute = ({ children, role }: { children?: React.ReactNode, role?: UserRole }) => {
  const user = authService.getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          
          <Route path="student" element={
            <ProtectedRoute role={UserRole.STUDENT}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="student/test/:id" element={
            <ProtectedRoute role={UserRole.STUDENT}>
              <TestScreen />
            </ProtectedRoute>
          } />

          <Route path="teacher" element={
            <ProtectedRoute role={UserRole.TEACHER}>
              <TeacherDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="teacher/create-test" element={
            <ProtectedRoute role={UserRole.TEACHER}>
              <CreateTest />
            </ProtectedRoute>
          } />
          
           <Route path="teacher/results/:id" element={
            <ProtectedRoute role={UserRole.TEACHER}>
              <TestResults />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;