import { useExpense } from "../../context/ExpenseContext";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpensesOverview() {
    const { expenses } = useExpense();

    // Get last 30 days expenses
    const last30DaysData = useMemo(() => {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        return expenses
            .filter(e => new Date(e.date) >= last30Days)
            .map(e => ({
                date: new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
                amount: e.amount
            }));
    }, [expenses]);

    // Get latest 4 expenses
    const recentExpenses = useMemo(() => {
        return [...expenses]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4);
    }, [expenses]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expenses List */}
            <div className="bg-white shadow p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Expenses</h3>
                    <Link to="/auth/expense" className="text-purple-600 text-sm hover:underline">See All ➜</Link>
                </div>
                <ul>
                    {recentExpenses.length > 0 ? (
                        recentExpenses.map((t, index) => (
                            <li key={index} className="flex justify-between py-2 border-b last:border-none">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{t.icon}</span>
                                    <div>
                                        <p className="font-medium">{t.category}</p>
                                        <p className="text-gray-400 text-sm">
                                            {new Date(t.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-red-500">
                                    - ${t.amount.toLocaleString()}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">No expenses found</p>
                    )}
                </ul>
            </div>

            {/* Last 30 Days Expenses Chart */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Last 30 Days Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={last30DaysData}
                        margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                            width={50}
                            allowDecimals={false}
                            tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
                        />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Bar dataKey="amount" fill="#8b5cf6" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
