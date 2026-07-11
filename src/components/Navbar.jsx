import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { toggleSidebar } from "../features/ui/sidebarSlice";

export default function Navbar() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sky-50 text-slate-800 h-14 px-3 sm:px-6 shadow-sm flex items-center justify-between border-b border-sky-100">
      {/* Left side: Toggle + Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-md hover:bg-sky-100 active:bg-sky-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="hidden sm:block text-base font-semibold tracking-tight text-slate-900">
          Dashboard
        </span>
      </div>

      {/* Right side: Username */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-xs font-medium uppercase text-white">
            {user.name?.charAt(0)}
          </div>
          <span className="hidden sm:inline text-sm font-medium text-slate-700">
            {user.name}
          </span>
        </div>
      </div>
    </nav>
  );
}
