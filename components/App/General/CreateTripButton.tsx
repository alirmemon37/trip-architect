"use client"

import { useAppViewStore } from "@/store/AppViewStore";
import { useCreateTripModalStore } from "@/store/CreateTripModalStore";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

const CreateTripButton = () => {

  const [view, setView] = useAppViewStore((state) => [state.view, state.setView]);
  const openModal = useCreateTripModalStore((state) => state.openModal);

  return (
    <div
      onClick={() => {
        if (view == "trips") {
          openModal();
          return;
        }
        setView("trips");
      }}
      title="Create new Trip"
      className="flex items-center px-3 py-1.5 cursor-pointer rounded-full bg-blue-500  hover:opacity-80 active:bg-blue-700 transition duration-300 text-white font-semibold max-w-[150px] justify-center"
    >
      <PlusIcon className="h-4 w-4 mr-1" />
      Create Trip
    </div>
  );
};

export default CreateTripButton;
