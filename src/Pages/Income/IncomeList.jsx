import { useIncome } from "../../context/IncomeContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function IncomeList() {
    const { incomes, deleteIncome, downloadIncome } = useIncome();
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg w-full mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Income Sources</h2>
                <button
                    onClick={downloadIncome}
                    className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition"
                >
                    ⬇ Download
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {incomes.map((income) => (
                    <div
                        key={income._id}
                        onMouseEnter={() => setHoveredId(income._id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        {/* Left side: Icon, Source, Date */}
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{income.icon || "💰"}</span>
                            <div>
                                <p className="font-semibold text-gray-700">{income.source}</p>
                                <p className="text-sm text-gray-400">
                                    {new Date(income.date).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Right side: Amount */}
                        <div className="flex items-center space-x-3">
                            <p className="text-green-500 font-semibold">+ ₹{income.amount}</p>

                            {/* Delete Button (visible on hover) */}
                            {hoveredId === income._id && (
                                <button
                                    onClick={() => deleteIncome(income._id)}
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
