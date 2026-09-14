import axios from "axios";

const api = axios.create({
  baseURL: "https://exclusive-store-ijs6.onrender.com/api/"
});

export default api;