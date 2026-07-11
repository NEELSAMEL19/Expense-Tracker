
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function FinancialDonutChart({ balance, income, expense }) {
    const chartData = [
        { name: "Total Balance", value: balance },
        { name: "Total Expenses", value: expense },
        { name: "Total Income", value: income },
    ];

    const COLORS = ["#8b5cf6", "#ef4444", "#f97316"];

    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Financial Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        innerRadius={70}
                        outerRadius={100}
                        dataKey="value"
                        paddingAngle={2}
                    >
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <p className="text-center font-semibold text-lg">
                Total Balance ${balance.toLocaleString()}
            </p>
            <div className="flex justify-center space-x-4 text-sm mt-2">
                <span className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 mr-1"></span>Balance
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 mr-1"></span>Expenses
                </span>
                <span className="flex items-center">
                    <span className="w-3 h-3 bg-orange-500 mr-1"></span>Income
                </span>
            </div>
        </div>
    );
}
