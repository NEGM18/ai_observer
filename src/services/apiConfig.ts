/// <reference types="vite/client" />
import axios from 'axios';

// Ensure we have a base URL. Fallback to local PHP server default.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api.php';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;