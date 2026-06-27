import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
function Layout() {
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebar");

    return savedState ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebar", JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar isOpen={isOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
        <Outlet/>
        </main>

      </div>

    </div>
  );
}

export default Layout;