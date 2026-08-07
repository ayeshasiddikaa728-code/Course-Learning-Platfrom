import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor for token authorization
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const fetchCourses = () => API.get('/courses');
export const fetchCourseDetails = (id) => API.get(`/courses/${id}`);
export const enrollCourse = (data) => API.post('/enrollments', data);

export default API;