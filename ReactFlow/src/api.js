import axios from 'axios';

// Create an Axios instance with the base URL of your FastAPI backend
const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;