export default function RecentTransaction({ transactions }) {
    return (
        <div className="bg-white shadow p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Recent Transactions</h3>
                <button className="text-purple-600 text-sm hover:underline">See All ➜</button>
            </div>
            <ul>
                {transactions && transactions.length > 0 ? (
                    transactions.map((t) => {
                        // Detect transaction type (expense or income)
                        const isExpense = !!t.category;

                        return (
                            <li
                                key={t._id}
                                className="flex justify-between py-2 border-b last:border-none"
                            >
                                {/* Icon and details */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{t.icon}</span>
                                    <div>
                                        <p className="font-medium">
                                            {t.source || t.category}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {new Date(t.date).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Amount */}
                                <p
                                    className={`font-semibold ${isExpense
                                            ? "text-red-500"
                                            : "text-green-500"
                                        }`}
                                >
                                    {isExpense
                                        ? `- $${t.amount.toLocaleString()}`
                                        : `+ $${t.amount.toLocaleString()}`}
                                </p>
                            </li>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        No recent transactions
                    </p>
                )}
            </ul>
        </div>
    );
}
