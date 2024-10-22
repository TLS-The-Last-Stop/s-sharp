import axios from 'axios';

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const axiosWithAuth = () => {
  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    console.error('액세스 토큰이 없음');
    return axios;
  }

  return axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};
