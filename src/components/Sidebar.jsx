import { useContext } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext1";

function SideBar({ isSideBar, openSideMenu }) {
  const { session, logout } = useContext(AuthContext);
  const location = useLocation();

  const menu = [
    { item: "Dashboard", icon: <MdSpaceDashboard />, link: "/dashboard" },
    {
      item: "Ticket",
      icon: <BiSolidCategoryAlt />,
      link: "/dashboard/tickets",
    },
    {
      item: "Settings",
      icon: <IoSettingsSharp />,
      link: "/dashboard/settings",
    },
  ];
  return (
    <div
      className={`z-40 fixed bg-white dark:bg-[#292827] top-0 left-0 border-r border-gray-400 w-62 h-screen mt-10 pt-10 sm:translate-x-0 transition-transform ${
        isSideBar ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ul className="dark:text-gray-200 mx-4 text-gray-800 text-lg font-bold flex flex-col gap-4">
        {menu.map((list) => (
          <Link
            to={list.link}
            key={list.item}
            onClick={() => openSideMenu(false)}
          >
            <li
              className={`p-2 rounded-lg flex gap-2 items-center transition-colors
                ${
                  location.pathname === list.link
                    ? "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-200"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
                }`}
            >
              {list.icon} {list.item}
            </li>
          </Link>
        ))}
      </ul>
      {/* Profile Section */}
      {session?.user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#292827]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* User Avatar with Initials */}
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-orange-600 dark:text-orange-200 font-semibold">
                {session.user.name.charAt(0).toUpperCase()}
              </div>
              {/* User Info */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold dark:text-gray-200">
                  {session.user.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {session.user.email}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-full"
            >
              <LuLogOut className="text-gray-500" />
              <span>Logout</span>
            </button>

            {/* Session Expiry */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Session expires:{" "}
              {new Date(session.expiresAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
