import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import {
  fetchIncomes,
  deleteIncome,
  downloadIncome,
} from "../../features/income/incomeSlice";

export default function IncomeList() {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.income);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteIncome(id));
  };

  const handleDownload = () => {
    dispatch(downloadIncome());
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Income Sources</h2>
        <button
          onClick={handleDownload}
          className="bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition"
        >
          ⬇ Download
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      {loading ? (
        <div className="flex items-center justify-center h-24 text-gray-400 text-sm">
          Loading income sources...
        </div>
      ) : incomes.length === 0 ? (
        <div className="flex items-center justify-center h-24 text-gray-400 text-sm">
          No income entries yet.
        </div>
      ) : (
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
                <p className="text-green-500 font-semibold">
                  + ₹{income.amount}
                </p>

                {/* Delete Button (visible on hover) */}
                {hoveredId === income._id && (
                  <button
                    onClick={() => handleDelete(income._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
