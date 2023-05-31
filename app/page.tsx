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
    getUser()
  }, [getUser]);

  const redirectToLoginPage = () => {
    if (!userLoading && !user) {
      router.push("/login");
      return;
    }
    router.push("/app");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-center">
        Trip Architect 🛠️
      </h1>
      {userLoading ? (
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
                onClick={() => logout()}
                className="border-2 border-black px-8 py-3 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <> </>
          )}
        </>
      )}
      <button
        onClick={redirectToLoginPage}
        className="mt-4 border-2 border-black px-8 py-3 rounded-full"
      >
        Let&apos;s Travel
      </button>
    </div>
  );
}
