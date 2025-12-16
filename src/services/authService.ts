import api from './apiConfig';
import { User, AuthResponse, UserRole } from '../types';
import { storageService } from './storageService';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Determine target URL based on backend implementation. 
    // Using path-info style: /auth/login
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.user) {
      storageService.saveUser(response.data.user);
      storageService.saveToken(response.data.token);
      return response.data.user;
    }
    throw new Error('Login failed');
  },

  signup: async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/signup', { name, email, password, role });
     if (response.data.user) {
      storageService.saveUser(response.data.user);
      storageService.saveToken(response.data.token);
      return response.data.user;
    }
    throw new Error('Signup failed');
  },

  logout: () => {
    storageService.clear();
    window.location.href = '/';
  },

  getCurrentUser: (): User | null => {
    return storageService.getUser();
  }
};