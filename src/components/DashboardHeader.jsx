import { TiThMenuOutline } from "react-icons/ti";
import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { Link } from "react-router";
import { GrClose } from "react-icons/gr";

function DashboardHeader({ toggleDarkMode, darkMode, openSideMenu, isSideBar}) {

  return (
    <div className="relative">
      <nav
        className="bg-white h-14 fixed z-50 left-0 right-0 border-b border-gray-200
     dark:border-gray-700 dark:bg-[#292827] top-0 mb-80 pl-2 pr-2 lg:pl-7 lg:pr-7"
      >
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={openSideMenu}
              className=" border border-gray-400 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 lg:hidden"
            >
              
              {isSideBar ? (
                <GrClose className="dark:text-white"/>
              ) : (
                <TiThMenuOutline className="dark:text-white" />
              )}
            </button>
            <Link to={"/"}>
              <span className="font-extrabold text-orange-300 lg:text-2xl">
                TicketFlow
              </span>
            </Link>
          </div>
          <div className="div">
            <input
              type="text"
              className="bg-gray-200 dark:bg-gray-500 border-none outline-0 p-2 rounded-lg w-30 lg:w-70"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center gap-8">
            
            <button onClick={toggleDarkMode}>
              {darkMode ? (
                <MdWbSunny className="dark:text-white size-5" />
              ) : (
                <FaMoon className="dark:text-white size-5" />
              )}
            </button>
          </div>
        </div>
       
      </nav>
    </div>
  );
}

export default DashboardHeader;
