import { createContext, useContext, useState, useEffect } from "react";
import { getDashboardDataService } from "../Services/DashboardService";

const DashboardContext = createContext(null);

const emptyDashboard = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  recentTransactions: [],
};

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(emptyDashboard);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await getDashboardDataService();
      const data = res?.data; // unwrap { success, message, data }
      setDashboardData(data || emptyDashboard);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setDashboardData(emptyDashboard);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Initial fetch (if already logged in)
    fetchDashboardData();

    // ✅ Re-fetch dashboard when login/logout or CRUD happens
    const handleDashboardUpdate = () => fetchDashboardData();

    window.addEventListener("auth-updated", handleDashboardUpdate);
    window.addEventListener("dashboard-updated", handleDashboardUpdate);

    return () => {
      window.removeEventListener("auth-updated", handleDashboardUpdate);
      window.removeEventListener("dashboard-updated", handleDashboardUpdate);
    };
  }, []);

  return (
    <DashboardContext.Provider
      value={{ dashboardData, loading, fetchDashboardData }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
