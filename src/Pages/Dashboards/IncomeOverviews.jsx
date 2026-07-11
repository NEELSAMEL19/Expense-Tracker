import { useIncome } from "../../context/IncomeContext";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function IncomeOverview() {
    const { incomes } = useIncome();

    // Group income by source
    const chartData = useMemo(() => {
        const grouped = incomes.reduce((acc, curr) => {
            acc[curr.source] = (acc[curr.source] || 0) + curr.amount;
            return acc;
        }, {});
        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    }, [incomes]);

    // Recent 5 income entries
    const recentIncome = useMemo(() => {
        return [...incomes]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
    }, [incomes]);

    const COLORS = ["#8b5cf6", "#f43f5e", "#f97316", "#10b981", "#3b82f6"];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Last 60 Days Income Donut Chart */}
            <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Last 60 Days Income</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`$${value}`, name]} />
                    </PieChart>
                </ResponsiveContainer>
                <p className="text-center font-semibold text-lg">
                    ${chartData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                </p>
            </div>

            {/* Recent Income List */}
            <div className="bg-white shadow p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Income</h3>
                    <Link to="/auth/income" className="text-purple-600 text-sm hover:underline">See All ➜</Link>
                </div>
                <ul>
                    {recentIncome.length > 0 ? (
                        recentIncome.map((t, index) => (
                            <li key={index} className="flex justify-between py-2 border-b last:border-none">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{t.icon}</span>
                                    <div>
                                        <p className="font-medium">{t.source}</p>
                                        <p className="text-gray-400 text-sm">
                                            {new Date(t.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold text-green-500">
                                    + ${t.amount.toLocaleString()}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">No income records</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
