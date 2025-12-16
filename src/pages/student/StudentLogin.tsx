import React from 'react';
import Login from '../auth/Login';

const StudentLogin: React.FC = () => {
  // Logic to force student role could go here, 
  // but for simplicity we reuse the main login component
  return (
    <div>
      <h2 className="text-center mt-8 text-lg text-gray-500">Student Portal</h2>
      <Login />
    </div>
  );
};

export default StudentLogin;