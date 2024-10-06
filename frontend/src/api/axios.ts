import axios from "axios";
import { API_KEY, API_URL } from "../config/config";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  timeout: 10000,
});
