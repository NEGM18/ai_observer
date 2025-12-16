import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/apiConfig';
import { Test } from '../../types';

const StudentDashboard: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.get<Test[]>('/tests'); // Backend must handle this
        setTests(response.data);
      } catch (error) {
        console.error('Failed to fetch tests', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) return <div className="text-center p-10">Loading tests...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Available Tests</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map(test => (
          <div key={test.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{test.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{test.description}</p>
              <div className="mt-4">
                <Link 
                  to={`/student/test/${test.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Take Test
                </Link>
              </div>
            </div>
          </div>
        ))}
        {tests.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">No tests available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;