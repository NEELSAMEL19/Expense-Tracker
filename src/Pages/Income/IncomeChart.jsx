import { useMemo, useState } from "react";
import { useIncome } from "../../context/IncomeContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import AddIncome from "./AddIncome";

export default function IncomeChart() {
    const { incomes } = useIncome();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Format income data for the chart
    const chartData = useMemo(() => {
        return incomes.map((income) => ({
            date: new Date(income.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
            }),
            amount: income.amount,
        }));
    }, [incomes]);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg w-full">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Income Overview</h2>
                    <p className="text-gray-500 text-sm">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition"
                >
                    + Add Income
                </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis
                        allowDecimals={false}
                        width={60}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => 
                            value >= 1000 ? `₹${(value / 1000).toFixed(1)}k` : `₹${value}`
                        }
                    />
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Bar 
                        dataKey="amount" 
                        fill="#8b5cf6" 
                        radius={[5, 5, 0, 0]} 
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>

            {/* Add Income Modal */}
            <AddIncome isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
