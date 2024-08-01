import axios from "axios";

const serverApi = axios.create({
  baseURL: "http://localhost:3100/",
});

serverApi.interceptors.request.use((config) => {
  return config;
});

export default serverApi;
