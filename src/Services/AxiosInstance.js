import axios from "axios";
import { BASEURL } from "./ApiPaths";

const LOGIN_ROUTE = "/auth/login";

const AxiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true, // ✅ send cookies with every request
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // ❌ If session is invalid or expired
      if (status === 401) {
        if (window.location.pathname !== LOGIN_ROUTE) {
          window.location.href = LOGIN_ROUTE;
        }
      }

      if (status === 500) {
        console.error("Server error occurred. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please check your internet connection.");
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
