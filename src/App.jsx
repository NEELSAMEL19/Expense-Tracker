import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboards/Dashboards";
import ProtectedRoute from "./utils/ProtectedRoute";
import Income from "./Pages/Income/Income";
import Expense from "./Pages/Expense/Expense";

import GlobalProvider from "./context/GlobalProvider";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/auth/login" />} />

          {/* Public Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute role="user" />}>
            <Route path="/auth/dashboard" element={<Dashboard />} />
            <Route path="/auth/income" element={<Income />} />
            <Route path="/auth/expense" element={<Expense />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}
