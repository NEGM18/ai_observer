import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { UserRole } from '../types';

const Layout: React.FC = () => {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl text-indigo-600">AI Observer</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {user?.role === UserRole.TEACHER && (
                  <>
                    <Link to="/teacher" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">Dashboard</Link>
                    <Link to="/teacher/create-test" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">Create Test</Link>
                  </>
                )}
                 {user?.role === UserRole.STUDENT && (
                  <Link to="/student" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">Dashboard</Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-500">Hello, {user.name}</span>
                  <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-500">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">Login</Link>
                  <Link to="/signup" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;