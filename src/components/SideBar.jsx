import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FilePlus, BarChart2, LogOut } from "lucide-react";

export default function SideBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  if (!user) return null;

  const avatarSrc = user?.avatar || "/default-avatar.png";

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <aside
      className={`bg-slate-900 text-slate-100 fixed top-14 left-0
        h-[calc(100vh-3.5rem)] z-40
        transition-all duration-300 ease-in-out
        w-64 ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0 ${isOpen ? "sm:w-64" : "sm:w-16"}`}
    >
      {/* User Info */}
      <div className="p-4 flex items-center gap-3 overflow-hidden">
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />
        {isOpen && (
          <div className="text-sm min-w-0">
            <p className="font-semibold truncate">{user?.name}</p>
            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="p-3 space-y-2 text-sm">
        <SidebarItem
          to="/auth/dashboard"
          icon={<BarChart2 size={20} />}
          label="Dashboard"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/auth/income"
          icon={<FilePlus size={20} />}
          label="Income"
          isOpen={isOpen}
        />
        <SidebarItem
          to="/auth/expense"
          icon={<FilePlus size={20} />}
          label="Expense"
          isOpen={isOpen}
        />

        {/* Logout is an action, not a route link */}
        <li>
          <button
            onClick={handleLogout}
            title={!isOpen ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors
              text-slate-300 hover:bg-slate-800 hover:text-white
              ${isOpen ? "" : "sm:justify-center"}`}
          >
            <span className="shrink-0">
              <LogOut size={20} />
            </span>
            {isOpen && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
}

function SidebarItem({ to, icon, label, isOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        title={!isOpen ? label : undefined}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md transition-colors
           ${isOpen ? "" : "sm:justify-center"}
           ${isActive ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
        }
      >
        <span className="shrink-0">{icon}</span>
        {isOpen && <span className="whitespace-nowrap">{label}</span>}
      </NavLink>
    </li>
  );
}
