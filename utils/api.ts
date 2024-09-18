import Axios from "axios";

const api = Axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api.buyfarma.com.br/api",
});
api.interceptors.request.use((config) => {
  config.headers["locale"] = navigator.language.toLowerCase();
  return config;
});

export default api;
