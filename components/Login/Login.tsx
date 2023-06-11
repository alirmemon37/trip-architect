"use client";

import { account } from "@/appwrite";
import { useUserStore } from "@/store/UserStore";
import { AppwriteException } from "appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  FC,
  Dispatch,
  SetStateAction,
  FormEvent,
  useState,
} from "react";

const Login: FC<{ setRegister: Dispatch<SetStateAction<boolean>> }> = ({
  setRegister,
}) => {
  const setUserLoading = useUserStore((state) => state.setUserLoading);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUserLoading(true);
      await account.createEmailSession(email, password);
      setUserLoading(false);
      router.push("/app");
    } catch (error) {
      console.log(error);
      if (error instanceof AppwriteException) {
        const errorResponse = error.response as any;
        alert(errorResponse.message);
      }
    }
  };

  return (
    <section className="h-screen mx-auto grid md:grid-cols-9">
      <div className="col-span-5 md:justify-self-center flex-grow flex flex-col md:max-w-xl justify-center py-6 px-8 md:pl-16 md:pr-8">
        <span className="text-4xl mb-4 md:hidden">🛠️</span>
        <h1 className="text-5xl md:text-6xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-500 mt-2 mb-2 text-lg">
          Enter the information you added while registering.
        </p>
        <form onSubmit={handleLogin}>
          <label className="block mt-6">Email</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900 outline-none"
            type="required"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            autoComplete="email"
            required
          />
          <label className="block mt-6">Password</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900 outline-none"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            autoComplete="password"
            required
          />
          <p className="mt-8 text-right">
            {" "}
            Don&apos;t have an account ?{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => setRegister(true)}
            >
              Sign Up
            </span>{" "}
          </p>
          <div className="mt-6">
            <button
              type="submit"
              disabled={!email || !password}
              className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="relative overflow-hidden col-span-4 hidden md:flex items-center">
        <Image
          src="/login-img.png"
          fill={true}
          alt="Login page"
          className="scale-150"
        />
      </div>
    </section>
  );
};

export default Login;
