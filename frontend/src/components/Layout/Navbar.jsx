import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {}

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div className="relative hidden md:block">

          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

      </div>

      <div className="flex items-center gap-5">

        <button className="relative rounded-lg p-2 hover:bg-gray-100">

          <BellIcon className="h-6 w-6 text-gray-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="relative">

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
          >

<div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 font-semibold text-blue-700">
  {user?.name?.charAt(0).toUpperCase()}
</div>

            <div className="hidden text-left sm:block">

              <p className="text-sm font-semibold text-gray-900">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>

            </div>

            <ChevronDownIcon className="h-5 w-5 text-gray-500" />

          </button>

          {showMenu && (

            <div className="absolute right-0 mt-3 w-52 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">


              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;