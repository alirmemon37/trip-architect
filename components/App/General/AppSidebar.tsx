import React from "react";
import AppSidebarItems from "./AppSidebarItems";
 
const AppSidebar = () => {
  return (
    <>
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-76px)] fixed top-[76px] bottom-0 left-0 p-1 w-[72px] shadow-lg z-40`}
      >
        <AppSidebarItems />
      </aside>

      <aside className="fixed left-0 right-0 bottom-0 w-full flex md:hidden flex-row justify-evenly items-center shadow-xl border-t-2 border-gray-100 z-40 bg-white">
        <AppSidebarItems />
      </aside>
    </>
  );
};

export default AppSidebar;
