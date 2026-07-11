import AxiosInstance from "./AxiosInstance";
import { API_PATHS } from "./ApiPaths";

export const registerService = async (formData) => {
  try {
    const { data } = await AxiosInstance.post(
      API_PATHS.AUTH.REGISTER,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginService = async (payload) => {
  try {
    const { data } = await AxiosInstance.post(API_PATHS.AUTH.LOGIN, payload);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const getProfileService = async () => {
  try {
    const { data } = await AxiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Unable to fetch profile" };
  }
};

export const logoutService = async () => {
  try {
    const { data } = await AxiosInstance.post(API_PATHS.AUTH.LOGOUT);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
};
