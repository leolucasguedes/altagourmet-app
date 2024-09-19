import Axios from "axios";

const api = Axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:5500",
});

export default api;
