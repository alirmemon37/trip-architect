"use client"

import getUrl from "@/lib/getUrl";
import { useUserStore } from "@/store/UserStore";
import Avvvatars from "avvvatars-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserAvatar = () => {
  const user = useUserStore((state) => state.user);

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      setImageLoading(true);
      if (user?.prefs?.avatar) {
        const url = await getUrl(JSON.parse(user.prefs.avatar));
        if (url) {
          setImageUrl(url.toString());
        }
      }
      setImageLoading(false);
    };

    fetchImage();
  }, [user?.prefs?.avatar]);

  return (
    <div>
      {imageLoading ? (
        <div className="w-full h-full rounded-full bg-gray-500 animate-pulse" />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          fill={true}
          alt="Avatar"
          className="object-cover rounded-full"
        />
      ) : (
        <Avvvatars
          value={user?.name || ""}
          style="character"
          size={38}
          shadow={true}
          border={true}
          borderSize={2}
          borderColor="#fff"
        />
      )}
    </div>
  );
};

export default UserAvatar;
