import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/apiConfig';
import { Test } from '../../types';

const TeacherDashboard: React.FC = () => {
  const [myTests, setMyTests] = useState<Test[]>([]);

  useEffect(() => {
    // In a real app, this would be /tests?teacher_id=... or filtered by session
    api.get<Test[]>('/tests').then(res => setMyTests(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <Link to="/teacher/create-test" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Create New Test
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {myTests.map(test => (
            <li key={test.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-indigo-600 truncate">{test.title}</h3>
                  <p className="text-sm text-gray-500">ID: {test.id} - {test.description}</p>
                </div>
                <div>
                  <Link 
                    to={`/teacher/results/${test.id}`}
                    className="ml-4 px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Results
                  </Link>
                </div>
              </div>
            </li>
          ))}
          {myTests.length === 0 && <li className="p-4 text-center text-gray-500">You haven't created any tests yet.</li>}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;