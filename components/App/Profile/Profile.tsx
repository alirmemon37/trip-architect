"use client";

import getUrl from "@/lib/getUrl";
import { useProfileStore } from "@/store/ProfileStore";
import { useUserStore } from "@/store/UserStore";
import { CameraIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const [
    avatarFile,
    setAvatarFile,
    name,
    setName,
    updateProfileName,
    updateProfileAvatar,
    profileLoading,
    setProfileLoading,
  ] = useProfileStore((state) => [
    state.avatarFile,
    state.setAvatarFile,
    state.name,
    state.setName,
    state.updateProfileName,
    state.updateProfileAvatar,
    state.profileLoading,
    state.setProfileLoading,
  ]);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  useEffect(() => {
    setName(user?.name ?? "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const avatarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setProfileLoading(true);

    // if no avatar file is selected and name is not changed
    if (!avatarFile && name === user?.name) {
      return;
    }

    if (avatarFile) {
      const avatarResponse = await updateProfileAvatar(avatarFile);
      setUser({
        ...user!,
        prefs: {
          ...user?.prefs!,
          avatar: avatarResponse?.prefs?.avatar!,
        },
        $updatedAt: avatarResponse?.$updatedAt!,
      });
      console.log(avatarResponse);
    }

    if (name !== user?.name) {
      const nameResponse = await updateProfileName(name);
      setUser({
        ...user!,
        name: name,
        $updatedAt: nameResponse?.$updatedAt!,
      });
      console.log(nameResponse);
    }

    setProfileLoading(false);
  };

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
    <div className="flex flex-col gap-4 p-4 md:py-6 md:px-10">
      <h1 className="text-5xl md:text-7xl font-extrabold">Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 max-w-xl">
          <div>
            <div
              className={clsx(
                "relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] border-[1px] md:border-[3px] border-gray-200 rounded-full",
                imageUrl ? "border-solid" : "border-dashed"
              )}
            >
              {avatarFile ? (
                <div
                  className="w-full h-full relative rounded-full overflow-hidden"
                  onClick={() => avatarRef.current?.click()}
                >
                  <Image
                    src={URL.createObjectURL(avatarFile)}
                    // onClick={() => setAvatarFile(null)}
                    fill={true}
                    className="object-cover w-full h-full cursor-pointer transition-all duration-150"
                    alt="Avatar"
                  />
                </div>
              ) : imageLoading ? (
                <div className="w-full h-full bg-gray-100 animate-pulse" />
              ) : imageUrl ? (
                <Image
                  src={imageUrl}
                  fill={true}
                  alt="Avatar"
                  className="object-cover rounded-full cursor-pointer filter transition-all duration-150"
                  onClick={() => avatarRef.current?.click()}
                />
              ) : (
                <div
                  className="w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200/50 transition-colors duration-150"
                  onClick={() => avatarRef.current?.click()}
                >
                  <CameraIcon className="w-6 h-6 md:w-10 md:h-10 text-gray-300" />
                </div>
              )}
            </div>

            <input
              ref={avatarRef}
              type="file"
              onChange={(e) => {
                // no file selected
                if (!e.target.files) return;

                // not an image
                if (!e.target.files[0]?.type.startsWith("image/")) return;

                const file = e.target.files[0];
                setAvatarFile(file);
              }}
              hidden
            />
          </div>
          <div>
            <label htmlFor="name" className="font-semibold text-base">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent px-4 py-2.5 mt-2"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="font-semibold text-base">
              Email
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={user?.email}
              disabled
              placeholder="John Doe"
              className="w-full rounded-md text-gray-800 border border-gray-300 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent px-4 py-2.5 mt-2"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!avatarFile && name === user?.name}
          className="mt-4 px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {profileLoading ? "Updating" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
