import getUrl from "@/lib/getUrl";
import { useUserStore } from "@/store/UserStore";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Trip = ({
  trip,
}: {
  trip: {
    name: string;
    image: string;
    startDate: Date;
    endDate: Date;
    creator: string;
  };
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchImage = async () => {
      if (trip.image) {
        const url = await getUrl(JSON.parse(trip.image));
        if (url) {
          setImageUrl(url.toString());
        }
      }
    };

    fetchImage();
  }, [trip.image]);

  return (
    <div className="relative flex flex-col border-[2px] border-gray-300 h-[250px]">
      <div className="relative h-[150px] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill={true}
            alt="Trip image"
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-700 w-full h-[150px] animate-pulse" />
        )}
      </div>
      <div className="px-4">
        <div className="-translate-y-4">
          <Avvvatars
            value={user?.name || ""}
            style="character"
            size={36}
            shadow={true}
            border={true}
            borderSize={2}
            borderColor="#fff"
          />
        </div>
        <div className="-mt-2 flex flex-col justify-between">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">{trip.name}</h2>
            <span className="text-black/60 text-sm">0 places</span>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-sm">
              <span className="font-extralight">By </span>
              <span className="font-medium">{user?.name}</span>
            </div>
            <div className="flex flex-row text-white font-medium items-center text-sm">
              <div className="px-2 bg-blue-500 rounded-xl">
                {trip.startDate.toISOString().split("T")[0]}
              </div>
              <div className="h-[2px] w-[10px] bg-gray-400" />
              <div className="px-2 bg-blue-500 rounded-xl">
                {trip.endDate.toISOString().split("T")[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trip;
