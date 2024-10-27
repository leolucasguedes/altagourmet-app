import Axios from "axios";

const api = Axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL,
});

export default api;
