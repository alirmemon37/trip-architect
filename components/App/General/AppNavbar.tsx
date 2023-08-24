"use client";

import React, { Fragment } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/UserStore";
import Avvvatars from "avvvatars-react";
import { useAppViewStore } from "@/store/AppViewStore";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useCreateTripModalStore } from "@/store/CreateTripModalStore";
import UserAvatar from "./UserAvatar";
import CreateTripButton from "./CreateTripButton";
import Image from "next/image";

const AppNavbar = () => {
  const [user, logout] = useUserStore((state) => [state.user, state.logout]);
  const [view, setView] = useAppViewStore((state) => [
    state.view,
    state.setView,
  ]);
  const openModal = useCreateTripModalStore((state) => state.openModal);

  const router = useRouter();

  return (
    <nav className="w-full flex flex-row items-center px-4 py-4 gap-4 fixed top-0 left-0 right-0 z-40 bg-gray-100 h-[76px]">
      <div
        className="flex gap-1 cursor-pointer items-center"
        onClick={() => setView("home")}
      >
        <div>
          <Image
            src="/hammer-and-wrench.png"
            width={20}
            height={20}
            alt="hammer and wrench emoji"
          />
        </div>
        <span className="flex text-xl font-bold tracking-tighter relative">
          TripArchitect
        </span>
      </div>
      <div className="flex items-center flex-1 space-x-5 justify-end w-full">
        <CreateTripButton />
        <Menu as="div" className="relative inline-block">
          <div>
            <Menu.Button className="w-10 h-10 flex items-center space-x-2 rounded-full">
              <UserAvatar />
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
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setView("profile");
                        }}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          logout();
                          router.push("/");
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
