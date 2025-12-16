import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/apiConfig';
import { Test, Question } from '../../types';
import { authService } from '../../services/authService';

const TestScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get<Test>(`/tests/${id}`).then(res => {
      setTest(res.data);
    }).catch(err => console.error(err));
  }, [id]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!test || !authService.getCurrentUser()) return;
    setSubmitting(true);
    
    const formattedAnswers = Object.entries(answers).map(([qId, text]) => ({
      question_id: Number(qId),
      answer_text: text
    }));

    try {
      await api.post(`/tests/${test.id}/submit`, {
        student_id: authService.getCurrentUser()?.id,
        answers: formattedAnswers
      });
      alert('Test submitted successfully!');
      navigate('/student');
    } catch (error) {
      console.error(error);
      alert('Failed to submit test.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) return <div>Loading test...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
        <p className="text-gray-600 mt-2">{test.description}</p>
      </div>

      <div className="space-y-8">
        {test.questions?.map((q, index) => (
          <div key={q.id || index} className="p-4 bg-gray-50 rounded border">
            <p className="font-medium text-lg mb-3">{index + 1}. {q.question_text}</p>
            {q.question_type === 'text' ? (
              <textarea
                className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Type your answer here..."
                onChange={(e) => handleAnswerChange(q.id!, e.target.value)}
              />
            ) : (
              <div className="space-y-2">
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="Answer here"
                  onChange={(e) => handleAnswerChange(q.id!, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
};

export default TestScreen;