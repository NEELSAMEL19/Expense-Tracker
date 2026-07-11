import { createContext, useContext, useState, useEffect } from "react";
import { addIncomeService, getIncomeService, deleteIncomeService, downloadIncomeService } from "../Services/IncomeService";

const IncomeContext = createContext(null);

export const IncomeProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchIncomes = async () => {
        setLoading(true);
        try {
            const res = await getIncomeService();
            setIncomes(res?.data || []); // unwrap { success, message, data }
        } catch (error) {
            console.error("Failed to fetch incomes:", error);
            setIncomes([]);
        } finally {
            setLoading(false);
        }
    };

    const addIncome = async (payload) => {
        try {
            const res = await addIncomeService(payload);
            const newIncome = res?.data; // unwrap
            setIncomes((prev) => [...prev, newIncome]);

            // ✅ Notify dashboard to refresh
            window.dispatchEvent(new Event("dashboard-updated"));

            return newIncome;
        } catch (error) {
            throw error;
        }
    };

    const deleteIncome = async (id) => {
        try {
            await deleteIncomeService(id);
            setIncomes((prev) => prev.filter((income) => income._id !== id));

            // ✅ Notify dashboard to refresh
            window.dispatchEvent(new Event("dashboard-updated"));
        } catch (error) {
            throw error;
        }
    };

    const downloadIncome = async () => {
        try {
            const response = await downloadIncomeService();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "income.xlsx");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Failed to download income file:", error);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    return (
        <IncomeContext.Provider
            value={{ incomes, loading, fetchIncomes, addIncome, deleteIncome, downloadIncome }}
        >
            {children}
        </IncomeContext.Provider>
    );
};

export const useIncome = () => useContext(IncomeContext);