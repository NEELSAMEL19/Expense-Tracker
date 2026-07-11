import AxiosInstance from "./AxiosInstance";
import { API_PATHS } from "./ApiPaths";

export const addIncomeService = async (payload) => {
    try {
        const { data } = await AxiosInstance.post(API_PATHS.Income.Add_Income, payload);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to add income" };
    }
};

export const getIncomeService = async () => {
    try {
        const { data } = await AxiosInstance.get(API_PATHS.Income.GET_Income);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch income" };
    }
};

export const deleteIncomeService = async (id) => {
    try {
        const { data } = await AxiosInstance.delete(API_PATHS.Income.DELETE_Income(id));
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete income" };
    }
};

export const downloadIncomeService = async () => {
    try {
        const response = await AxiosInstance.get(API_PATHS.Income.Download_Income, {
            responseType: "blob", // for file download
        });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to download income file" };
    }
};
