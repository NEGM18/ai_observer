export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Question {
  id?: number;
  test_id?: number;
  question_text: string;
  question_type: 'text' | 'multiple_choice';
  options?: string; // JSON string for MC options
}

export interface Test {
  id: number;
  title: string;
  description: string;
  created_by: number;
  questions?: Question[];
}

export interface Answer {
  question_id: number;
  answer_text: string;
}

export interface TestSubmission {
  test_id: number;
  student_id: number;
  answers: Answer[];
}

export interface Result {
  id: number;
  test_id: number;
  student_id: number;
  score: number | null;
  feedback: string | null;
  created_at: string;
  test_title?: string;
}

export interface AuthResponse {
  user: User;
  token: string; // Simple mock token or session ID
}