import AxiosInstance from "./AxiosInstance";
import { API_PATHS } from "./ApiPaths";

export const getDashboardDataService = async () => {
    try {
        const { data } = await AxiosInstance.get(API_PATHS.Dashboard.GET_ALL);
        return data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch dashboard data" };
    }
};
