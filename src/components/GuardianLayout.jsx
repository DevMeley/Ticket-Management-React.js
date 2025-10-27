import { Suspense, useState } from "react";
import { Outlet} from "react-router-dom";
import SideBar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

function GuardianLayout({ notifications }) {
  const [isSideBar, setIsSideBar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const openSideMenu = () => {
    setIsSideBar(!isSideBar);
  };
  
  return (
    <div
      className={`${darkMode && "dark"}  bg-gray-50 
      dark:bg-[#292827] dark:text-gray-100 pb-6  min-h-screen`}
    >
      <main className="pt-10 mx-4 z-40">
        <DashboardHeader
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          isSideBar={isSideBar}
          openSideMenu={openSideMenu}
          notifications={notifications}
        />
        <SideBar
          openSideMenu={openSideMenu}
          isSideBar={isSideBar}
          setIsSideBar={setIsSideBar}
        />
      </main>
      <section className="mx-4 my-2 lg:pl-[280px]">
        <Suspense>
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
}

export default GuardianLayout;
