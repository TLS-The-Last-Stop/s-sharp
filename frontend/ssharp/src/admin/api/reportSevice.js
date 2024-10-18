import axios from 'axios';
import { axiosWithAuth } from '../../utils/authUtils';

const BASE_URL = 'http://localhost:8080/api';

export const reportService = {
  getAllReport      : async (page = 0, size = 50, keyword = '', searchType = 'all') => {
    try {
      const response = await axios.get(`${BASE_URL}/reports`, {
        params: { page, size, keyword, searchType }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all reports:', error);
      throw error;
    }
  },
  isReported        : async (postId) => {
    try {
      const auth = axiosWithAuth();
      const response = await auth.get(`${BASE_URL}/post/${postId}/report`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  },
  getReportsByPostId: async (postId, page, size) => {
    try {
      const response = await axios.get(`${BASE_URL}/post/${postId}/reports`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching reports for post ${postId}: `, error);
      throw error;
    }
  },
  createReport      : async (postId, reportData) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts/${postId}/report`, reportData);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reports for post ${postId}: `, error);
      throw error;
    }
  }


};

