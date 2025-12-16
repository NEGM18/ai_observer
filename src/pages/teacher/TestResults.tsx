import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/apiConfig';
import { Result } from '../../types';

const TestResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    // Mocking endpoint fetching results for a specific test
    // In a real implementation: GET /tests/:id/results
    // For this demo, we might just hit a generic endpoint or mock it if the backend doesn't fully support it yet
    const fetchResults = async () => {
       try {
         // Using a query param convention for simplicity with the single api.php
         const res = await api.get<Result[]>(`/tests/${id}/results`); 
         setResults(res.data);
       } catch (e) {
         console.log("No results found or endpoint not implemented");
         setResults([]);
       }
    };
    fetchResults();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Test Results</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.student_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(result.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.score !== null ? result.score : 'Pending'}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">No submissions yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResults;