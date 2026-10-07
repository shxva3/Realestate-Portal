import axios from "axios";

const api = axios.create({
  baseURL: "https://realestate-backend-1nal.onrender.com/"
});

export default api;
