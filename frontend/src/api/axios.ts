import axios from "axios";
import { API_URL } from "../config/config";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10000,
});
