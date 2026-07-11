import { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import EmojiPicker from "emoji-picker-react";

export default function AddExpense({ isOpen, onClose }) {
    const { addExpense } = useExpense();

    const [formData, setFormData] = useState({
        icon: "",
        category: "",
        amount: "",
        date: "",
    });

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmojiClick = (emojiObject) => {
        setFormData((prev) => ({ ...prev, icon: emojiObject.emoji }));
        setShowEmojiPicker(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addExpense(formData);
            onClose();
            setFormData({ icon: "", category: "", amount: "", date: "" });
        } catch (err) {
            console.error("Failed to add expense:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Icon Picker */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Pick Icon</label>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker((prev) => !prev)}
                                className="p-2 border rounded-md hover:bg-gray-100"
                            >
                                {formData.icon || "💸"}
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute mt-10 z-50">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                            <input
                                type="text"
                                name="icon"
                                placeholder="Or enter icon manually"
                                value={formData.icon}
                                onChange={handleChange}
                                className="flex-1 p-2 border rounded-md focus:ring focus:ring-purple-300"
                            />
                        </div>
                    </div>

                    {/* Expense Category */}
                    <div>
                        <label className="block text-sm text-gray-600">Expense Category</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Shopping, Transport, etc"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm text-gray-600">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm text-gray-600">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
}
