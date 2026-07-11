import AxiosInstance from "./AxiosInstance";
import { API_PATHS } from "./ApiPaths";

export const addExpenseService = async (payload) => {
    try {
        const { data } = await AxiosInstance.post(API_PATHS.Expense.Add_Expense, payload);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to add expense" };
    }
};

export const getExpenseService = async () => {
    try {
        const { data } = await AxiosInstance.get(API_PATHS.Expense.GET_Expense);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch expenses" };
    }
};

export const deleteExpenseService = async (id) => {
    try {
        const { data } = await AxiosInstance.delete(API_PATHS.Expense.DELETE_Expense(id));
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to delete expense" };
    }
};

export const downloadExpenseService = async () => {
    try {
        const response = await AxiosInstance.get(API_PATHS.Expense.Download_Expense, {
            responseType: "blob", // for file download
        });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to download expense file" };
    }
};
