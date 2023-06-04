import { ID, account } from "@/appwrite";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

const SignUp: FC<{ setRegister: Dispatch<SetStateAction<boolean>> }> = ({
  setRegister,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser, setUserLoading] = useUserStore((state) => [
    state.user,
    state.setUser,
    state.setUserLoading,
  ]);

  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUserLoading(true);
      const newUser = await account.create(ID.unique(), email, password, name);
      await account.createEmailSession(email, password);
      setUserLoading(false);
      router.push("/app");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container h-screen mx-auto flex">
        <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
          <h1 className="text-6xl font-bold">Sign Up</h1>
          <p className="mt-4">
            {" "}
            Already have an account ?{" "}
            <span
              className="cursor-pointer underline"
              onClick={() => setRegister(false)}
            >
              Login
            </span>{" "}
          </p>
          <form onSubmit={handleSignup}>
            <label className="block mt-6">Name</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900 outline-none"
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              autoComplete="name"
              required
            />

            <label className="block mt-6"> Email</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900 outline-none"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              required
            />
            <label className="block mt-6"> Password</label>
            <input
              className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900 outline-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              autoComplete="password"
              required
            />

            <div className="mt-6">
              <button
                type="submit"
                disabled={!email || !password || !name}
                className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
