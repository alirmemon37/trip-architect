import getUrl from "@/lib/getUrl";
import { useUserStore } from "@/store/UserStore";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Trip = ({
  trip,
}: {
  trip: {
    $id: string;
    name: string;
    image: string;
    startDate: Date;
    endDate: Date;
    creator: string;
  };
}) => {
  const user = useUserStore((state) => state.user);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchImage = async () => {
      setImageLoading(true);
      if (trip.image) {
        const url = await getUrl(JSON.parse(trip.image));
        if (url) {
          setImageUrl(url.toString());
        }
      }
      setImageLoading(false);
    };

    fetchImage();
  }, [trip.image]);

  return (
    <div className="relative flex flex-col border-[2px] border-gray-300 min-h-[250px] md:h-[250px] md:cursor-pointer hover:border-black/60" onClick={() => {
      router.push(`/app/trip/${trip.$id}`)
    }}>
      <div className="relative h-[150px] w-full">
        {!imageLoading && imageUrl ? (
          <Image
            src={imageUrl}
            fill={true}
            alt="Trip image"
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 animate-pulse">
            <PhotoIcon className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1 px-4 pb-2">
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
          <div className="flex flex-col gap-2 md:flex-row items-start md:justify-between md:items-center w-full">
            <div className="text-sm">
              <span className="font-extralight">By </span>
              
              {/* desktop */}
              <span className="hidden md:inline font-medium">
                {user?.name.length! > 12
                  ? user?.name.substring(0, 10) + "..."
                  : user?.name}
              </span>

              {/* mobile */}
              <span className="inline md:hidden">{user?.name}</span>
            </div>
            <div className="flex flex-row text-white font-medium items-center text-sm">
              <div className="px-1.5 bg-blue-500 rounded-xl">
                {trip.startDate.toISOString().split("T")[0]}
              </div>
              <div className="h-[2px] w-[8px] bg-gray-400" />
              <div className="px-1.5 bg-blue-500 rounded-xl">
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
