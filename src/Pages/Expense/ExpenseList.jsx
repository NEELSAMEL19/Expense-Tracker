import { useExpense } from "../../context/ExpenseContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ExpenseList() {
    const { expenses, deleteExpense, downloadExpense } = useExpense();
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg w-full mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">All Expenses</h2>
                <button
                    onClick={downloadExpense}
                    className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition"
                >
                    ⬇ Download
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {expenses.map((expense) => (
                    <div
                        key={expense._id}
                        onMouseEnter={() => setHoveredId(expense._id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        {/* Left: Icon, Category, Date */}
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{expense.icon || "💸"}</span>
                            <div>
                                <p className="font-semibold text-gray-700">{expense.category}</p>
                                <p className="text-sm text-gray-400">
                                    {new Date(expense.date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Right: Amount */}
                        <div className="flex items-center space-x-3">
                            <p className="text-red-500 font-semibold">- ₹{expense.amount}</p>

                            {/* Delete Button (Visible on hover) */}
                            {hoveredId === expense._id && (
                                <button
                                    onClick={() => deleteExpense(expense._id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    <Trash2 />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
