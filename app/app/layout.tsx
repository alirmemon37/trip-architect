"use client";

import AppNavbar from "@/components/App/AppNavbar";
import AppSidebar from "@/components/App/AppSidebar";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, getUser, userLoading] = useUserStore((state) => [
    state.user,
    state.getUser,
    state.userLoading,
  ]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();

      const { user } = useUserStore.getState();

      if (!user) {
        router.replace("/login");
      }
    };

    fetchUser();
  }, [getUser, router]);

  return (
    <>
      {!userLoading && user ? (
        <div>
          <AppNavbar />
          <div className="flex flex-row w-full">
            <AppSidebar />

            <div className="pt-[76px] px-4 md:px-0 md:pl-[72px] flex-1">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <Image src="/loader.svg" alt="Loader" width={100} height={100} />
        </div>
      )}
    </>
  );
}
