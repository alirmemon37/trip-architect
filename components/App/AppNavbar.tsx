"use client";

import React, { Fragment } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/UserStore";
import Avvvatars from "avvvatars-react";
import { useAppViewStore } from "@/store/AppViewStore";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";

const AppNavbar = () => {
  const [user, logout] = useUserStore((state) => [state.user, state.logout]);
  const setView = useAppViewStore((state) => state.setView);

  const router = useRouter()

  return (
    <nav className="w-full flex flex-row items-center px-4 py-4 gap-4 fixed top-0 left-0 right-0 z-40 bg-gray-100">
      <div
        className="hidden md:flex cursor-pointer"
        onClick={() => setView("home")}
      >
        <span className="text-xl font-bold tracking-tighter">
          🛠️ TripArchitect
        </span>
      </div>
      <div className="flex items-center flex-1 space-x-5 justify-end w-full">
        <form className="flex items-center space-x-3 bg-white p-2 flex-1 md:flex-initial border-2 border-gray-300 rounded-full ">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="Where to?"
            className="outline-none flex-1"
          />
          <button type="submit" hidden>
            Search
          </button>
        </form>
        <div onClick={() => setView("trips")} title="Create new Trip" className="p-2 hover:bg-white/50 rounded-full cursor-pointer transition-colors duration-300">
          <PlusIcon className="h-6 w-6 text-gray-700" />
        </div>
        <Menu as="div" className="relative inline-block">
          <div>
            <Menu.Button className="flex items-center space-x-2">
              <Avvvatars
                value={user?.name || ""}
                style="character"
                size={38}
                shadow={true}
                border={true}
                borderSize={2}
                borderColor="#fff"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-44 mt-2 font-medium  origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          logout()
                          router.push("/")
                        }}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </div>
    </nav>
  );
};

export default AppNavbar;
