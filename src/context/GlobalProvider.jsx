// src/context/GlobalProvider.jsx
import { AuthProvider } from "./AuthContext";
import { IncomeProvider } from "./IncomeContext";
import { ExpenseProvider } from "./ExpenseContext";
import { DashboardProvider } from "./DashboardContext";

export default function GlobalProvider({ children }) {
    return (
        <AuthProvider>
            <IncomeProvider>
                <ExpenseProvider>
                    <DashboardProvider>
                        {children}
                    </DashboardProvider>
                </ExpenseProvider>
            </IncomeProvider>
        </AuthProvider>
    );
}
