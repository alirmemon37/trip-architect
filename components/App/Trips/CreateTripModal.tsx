"use client";

import React, { useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCreateTripModalStore } from "@/store/CreateTripModalStore";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useUserStore } from "@/store/UserStore";
import { useTripStore } from "@/store/TripStore";

const CreateTripModal = () => {
  const [
    isOpen,
    closeModal,
    imageFile,
    setImageFile,
    tripName,
    setTripName,
    tripStartDate,
    setTripStartDate,
    tripEndDate,
    setTripEndDate,
    createTrip,
  ] = useCreateTripModalStore((state) => [
    state.isOpen,
    state.closeModal,
    state.imageFile,
    state.setImageFile,
    state.tripName,
    state.setTripName,
    state.tripStartDate,
    state.setTripStartDate,
    state.tripEndDate,
    state.setTripEndDate,
    state.createTrip,
  ]);

  const id = useUserStore((state) => state.user?.$id);

  const addTrip = useTripStore((state) => state.addTrip);

  const imagePickerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    // end date should be greater than start date
    if (new Date(tripStartDate) > new Date(tripEndDate)) {
      alert("End date should be after the start date");
      return;
    }

    // convert start and end date to date objects
    const startDate = new Date(tripStartDate);
    const endDate = new Date(tripEndDate);

    // current user id
    const creator = id;

    // add trip to DB
    const response = await createTrip({
      name: tripName,
      startDate,
      endDate,
      creator: creator!,
      image: imageFile,
    });

    // optimistic update
    addTrip({
      name: tripName,
      startDate,
      endDate,
      creator: creator!,
      image: response?.image!,
      $id: response?.$id!,
      $createdAt: response?.$createdAt!,
      $updatedAt: response?.$updatedAt!,
      places: [],
    });

    setImageFile(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        onClose={closeModal}
        className="relative z-50"
      >
        {/* One Transition.Child to apply one transition to the backdrop... */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Another Transition.Child to apply a separate transition to the contents. */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transformm overflow-hidden rounded-sm bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between items-center text-lg font-bold leading-6 bg-gray-200 px-6 py-3"
                >
                  Create a Trip
                  <div
                    onClick={closeModal}
                    className="p-1 cursor-pointer rounded-full hover:bg-black/10 transition-all duration-300"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </div>
                </Dialog.Title>
                <div className="flex flex-col gap-4 mt-2 px-6 py-4">
                  <div>
                    {imageFile ? (
                      <div
                        className="w-full h-[200px] relative rounded-md overflow-hidden"
                        onClick={() => imagePickerRef.current?.click()}
                      >
                        <Image
                          src={URL.createObjectURL(imageFile)}
                          onClick={() => setImageFile(null)}
                          fill={true}
                          className="object-cover w-full h-full filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                          alt="Trip Image"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-[200px] relative rounded-md overflow-hidden flex  flex-col items-center justify-center bg-gray-100 cursor-pointer"
                        onClick={() => imagePickerRef.current?.click()}
                      >
                        <PhotoIcon className="w-10 h-10 text-gray-400" />
                        <span className="text-gray-400 text-lg font-semibold">
                          Upload an image
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={imagePickerRef}
                      hidden
                      onChange={(e) => {
                        // no file selected
                        if (!e.target.files) return;

                        // not an image
                        if (!e.target.files[0]?.type.startsWith("image/"))
                          return;

                        const file = e.target.files[0];
                        setImageFile(file);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="trip-name"
                      className="font-semibold text-base"
                    >
                      Trip Name
                    </label>
                    <input
                      id="trip-name"
                      name="name"
                      type="text"
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      placeholder="'23 Summer Avdenture"
                      className="w-full rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent px-4 py-2.5 mt-2"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="start-date"
                      className="font-semibold text-base"
                    >
                      Start Date
                    </label>
                    <input
                      id="start-date"
                      name="startDate"
                      type="date"
                      value={tripStartDate}
                      onChange={(e) => setTripStartDate(e.target.value)}
                      className="mt-2 w-full py-2 px-4 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="start-date"
                      className="font-semibold text-base"
                    >
                      End Date
                    </label>
                    <input
                      id="end-date"
                      name="endDate"
                      type="date"
                      value={tripEndDate}
                      onChange={(e) => setTripEndDate(e.target.value)}
                      className="mt-2 w-full py-2 px-4 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={!tripName || !tripStartDate || !tripEndDate}
                      className="inline-flex items-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Add Trip
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateTripModal;
