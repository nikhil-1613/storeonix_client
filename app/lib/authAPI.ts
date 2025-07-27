// app/lib/apiService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/register`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};
