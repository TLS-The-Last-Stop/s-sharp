import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchProtectedData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/protected');
    return response.data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    throw error;
  }
};
