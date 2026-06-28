import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ScaleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Vendors",
    path: "/vendors",
    icon: UsersIcon,
  },
  {
    name: "Quotations",
    path: "/quotations",
    icon: DocumentTextIcon,
  },
  {
    name: "Comparison",
    path: "/comparison",
    icon: ScaleIcon,
  },
  {
    name: "History",
    path: "/history",
    icon: ClockIcon,
  },
];

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
          V
        </div> */}

        {isOpen && (
          <div className="ml-3">
            <h1 className="text-lg font-bold text-gray-900">
              VendorHub
            </h1>

            <p className="text-xs text-gray-500">
              Management System
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-6 w-6 flex-shrink-0" />

              {isOpen && (
                <span className="ml-3 font-medium">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            M
          </div>

          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">
                Malaika
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;