import { useMemo, useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import AddExpense from "./AddExpense";

export default function ExpenseChart() {
    const { expenses } = useExpense();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Format data for the chart
    const chartData = useMemo(() => {
        return expenses.map((expense) => ({
            date: new Date(expense.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
            }),
            amount: expense.amount,
        }));
    }, [expenses]);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg w-full">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Expense Overview</h2>
                    <p className="text-gray-500 text-sm">
                        Track your spending trends over time and gain insights into where your money goes.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition"
                >
                    + Add Expense
                </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        width={60}
                        domain={[0, 'auto']}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>

            {/* Add Expense Modal */}
            <AddExpense isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
