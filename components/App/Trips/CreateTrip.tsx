"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCreateTripModalStore } from "@/store/CreateTripModalStore";
import CreateTripModal from "./CreateTripModal";

const CreateTrip = () => {
  const openModal = useCreateTripModalStore((state) => state.openModal);

  return (
    <>
      {/* desktop create trip */}
      <div
        onClick={openModal}
        className="hidden md:flex items-center justify-center border-[2px] border-gray-400 border-dashed h-[250px] hover:border-solid cursor-pointer hover:border-black font-medium hover:font-semibold"
      >
        <div className="flex gap-2 py-1 px-2 rounded-full items-center">
          <PlusIcon className="h-5 w-5" />
          <span>Create a Trip</span>
        </div>
      </div>

      {/* mobile create trip */}
      <div
        className="fixed right-[24px] bottom-[72px] z-50 rounded-full bg-blue-500 text-[#FFF] p-3 cursor-pointer transition-all duration-300 md:hidden"
        onClick={openModal}
      >
        <PlusIcon className="w-8 h-8" />
      </div>

      <CreateTripModal />
    </>
  );
};

export default CreateTrip;
