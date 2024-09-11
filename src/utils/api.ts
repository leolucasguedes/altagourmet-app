import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL:
    Constants.manifest?.extra?.API_URL || "https://api.buyfarma.com.br/api",
});

api.interceptors.request.use((config) => {
  config.headers["locale"] = navigator.language.toLowerCase();
  return config;
});

export default api;
