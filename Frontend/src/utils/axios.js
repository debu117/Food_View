import axios from "axios";

const instance = axios.create({
  baseURL: "https://food-view-x2nr.onrender.com/api",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/user/login";
    }
    return Promise.reject(error);
  },
);

export default instance;
