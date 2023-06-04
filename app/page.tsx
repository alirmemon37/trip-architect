"use client";

import { useUserStore } from "@/store/UserStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [user, getUser, logout, userLoading] = useUserStore((state) => [
    state.user,
    state.getUser,
    state.logout,
    state.userLoading,
  ]);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };

    fetchUser();
  }, [getUser]);

  const redirectToLoginPage = () => {
    if (!userLoading && !user) {
      router.push("/login");
      return;
    }
    router.push("/app");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-center">
        Trip Architect 🛠️
      </h1>
      <p className="text-gray-600 text-xl max-w-xl text-center mb-4">
        Join the travel revolution with Trip Architect. Explore, connect, and
        experience the world like never before.
      </p>
      <button
        onClick={redirectToLoginPage}
        className="text-lg mt-4 border-2 border-white px-8 py-3 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 transition duration-300 text-white font-semibold"
      >
        Let&apos;s Travel
        <span className="ml-2" role="img" aria-label="Globe">
          🌏
        </span>
      </button>
    </div>
  );
}
