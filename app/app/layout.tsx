"use client";

import AppNavbar from "@/components/App/AppNavbar";
import AppSidebar from "@/components/App/AppSidebar";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, getUser, userLoading] = useUserStore((state) => [state.user, state.getUser, state.userLoading]);
  const router = useRouter();

  useEffect(() => {
    getUser()
  }, [getUser]);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user])

  return (
    <>
      {!userLoading && user ? (
        <div>
          <AppNavbar />
          <div className="flex flex-row w-full">
            <AppSidebar />

            <div className="pt-[76px] md:pl-[72px] flex-1">{children}</div>
          </div>
        </div>
      ): (
        <Image src="/loader.svg" alt="Loader" width={100} height={100} />
      )}
    </>
  );
}
