import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { closeSidebar } from "../features/ui/sidebarSlice";

export default function Layout({ children }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 pt-14">
        <SideBar />

        {/* Backdrop for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            onClick={() => dispatch(closeSidebar())}
            className="fixed inset-0 top-14 bg-black/40 z-30 sm:hidden"
          />
        )}

        {/* Main content area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300
            ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}
        >
          <main className="flex-1 p-4 sm:p-6 bg-gray-50">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
