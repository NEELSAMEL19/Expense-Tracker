import { useState, useEffect, useCallback } from "react";
import Layout from "../../layouts/Layout";
import { getDashboardDataService } from "../../Services/DashboardService";
import RecentTransactions from "./RecentTransaction";
import FinancialDonutChart from "./FinancialDonutCharts";
import ExpensesOverview from "./ExpensesOverviews";
import IncomeOverview from "./IncomeOverviews";

const emptyDashboard = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  recentTransactions: [],
};

export default function Dashboards() {
  const [dashboardData, setDashboardData] = useState(emptyDashboard);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDashboardDataService();
      setDashboardData(res?.data || emptyDashboard);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setDashboardData(emptyDashboard);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();

    const handleUpdate = () => fetchDashboardData();
    window.addEventListener("auth-updated", handleUpdate);
    window.addEventListener("dashboard-updated", handleUpdate);

    return () => {
      window.removeEventListener("auth-updated", handleUpdate);
      window.removeEventListener("dashboard-updated", handleUpdate);
    };
  }, [fetchDashboardData]);

  if (loading || !dashboardData) {
    return (
      <Layout>
        <div className="text-center py-10">Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-100 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm">Total Income</h3>
            <p className="text-2xl font-bold text-orange-700">
              ${dashboardData.totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-700">
              ${dashboardData.totalExpense.toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm">Total Balance</h3>
            <p className="text-2xl font-bold text-purple-700">
              ${dashboardData.balance.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions
            transactions={dashboardData.recentTransactions || []}
          />
          <FinancialDonutChart
            balance={dashboardData.balance}
            income={dashboardData.totalIncome}
            expense={dashboardData.totalExpense}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <ExpensesOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <IncomeOverview />
        </div>
      </div>
    </Layout>
  );
}
