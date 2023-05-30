"use client";

import { useUserStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [user, getUser, logout] = useUserStore((state) => [
    state.user,
    state.getUser,
    state.logout,
  ]);

  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, [getUser]);

  const handleLogout = () => {
    logout();
  };

  const redirectToLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-center">
        Trip Architect
      </h1>
      {loading ? (
        <>
          <Image
            src="/loader.svg"
            alt="Loader"
            width={30}
            height={30}
            priority
          />
        </>
      ) : (
        <>
          {user ? (
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-lg md:text-2xl font-semibold">
                User Details
              </h3>

              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>

              <button
                onClick={handleLogout}
                className="border-2 border-black px-8 py-3 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={redirectToLoginPage}
              className="border-2 border-black px-8 py-3 rounded-full"
            >
              Let&apos;s Travel
            </button>
          )}
        </>
      )}
    </div>
  );
}
