import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/apiConfig';
import { authService } from '../../services/authService';
import { Question } from '../../types';

const CreateTest: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { question_text: '', question_type: 'text' }
  ]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { question_text: '', question_type: 'text' }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: string) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = authService.getCurrentUser();
    if (!user) return;

    try {
      await api.post('/tests', {
        title,
        description,
        created_by: user.id,
        questions
      });
      navigate('/teacher');
    } catch (error) {
      console.error(error);
      alert('Failed to create test');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Test</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Test Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="border-t pt-4 mt-6">
          <h2 className="text-lg font-medium mb-4">Questions</h2>
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4 p-4 bg-gray-50 rounded border">
              <label className="block text-sm font-medium text-gray-700">Question {idx + 1}</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 mb-2"
                placeholder="Enter question text"
                value={q.question_text}
                onChange={e => updateQuestion(idx, 'question_text', e.target.value)}
              />
              <select
                className="block w-full border border-gray-300 rounded-md p-2"
                value={q.question_type}
                onChange={e => updateQuestion(idx, 'question_type', e.target.value)}
              >
                <option value="text">Free Text</option>
                <option value="multiple_choice">Multiple Choice (Simplifed)</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            + Add Another Question
          </button>
        </div>

        <div className="mt-8 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Publish Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTest;