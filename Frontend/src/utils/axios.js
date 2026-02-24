import axios from "axios";

const instance = axios.create({
  baseURL: "https://food-view-x2nr.onrender.com/api",
  withCredentials: true,
});

export default instance;
