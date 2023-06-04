"use client";

import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCreateTripModalStore } from "@/store/CreateTripModalStore";
import CreateTripModal from "./CreateTripModal";

const CreateTrip = () => {
  const openModal = useCreateTripModalStore((state) => state.openModal);

  return (
    <>
      <div
        onClick={openModal}
        className="flex items-center justify-center border-[2px] border-gray-400 border-dashed h-[250px] hover:border-solid cursor-pointer hover:border-black font-medium hover:font-semibold"
      >
        <div className="flex gap-2 py-1 px-2 rounded-full items-center">
          <PlusIcon className="h-5 w-5" />
          <span>Create a Trip</span>
        </div>
      </div>

      <CreateTripModal />
    </>
  );
};

export default CreateTrip;
