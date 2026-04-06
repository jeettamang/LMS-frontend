import axios from "axios";
import { baseURL } from "../config/ApiRoute";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
