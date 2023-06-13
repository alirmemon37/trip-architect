import { Github } from "lucide-react";
import { Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-between h-screen p-4">
      <div className="flex w-full justify-between max-w-7xl">
        <span className="text-5xl">🛠️</span>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-center">
          Trip Architect 🛠️
        </h1>
        <p className="text-gray-600 text-xl max-w-xl text-center mb-4">
          Join the travel revolution with Trip Architect. Explore, connect, and
          experience the world like never before.
        </p>
        <Link href="/app">
          <button className="text-lg mt-4 border-2 border-white px-8 py-3 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-700 transition duration-300 text-white font-semibold">
            Let&apos;s Travel
            <span className="ml-2" role="img" aria-label="Globe">
              🌏
            </span>
          </button>
        </Link>
      </div>
      <footer className="flex flex-wrap w-full justify-between items-center max-w-7xl">
        <div className="flex text-lg font-medium items-center gap-2">
          Built by
          <Link
            className="underline text-blue-500"
            href="https://github.com/alirmemon37"
          >
            Ali Memon
          </Link>
          with
          <Link href="https://appwrite.io" target="_blank">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/appwrite-logo.jpg"
              className="mt-1 w-[40px]"
              alt="Appwrite logo"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-500">Share:</span>
          <div className="flex items-center gap-3">
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                "Calling all travel enthusiasts! Trip Architect is here to revolutionize your travel experience. 🌟 Seamlessly plan trips, connect with fellow explorers, and create unforgettable moments. Join us today! https://trip-architect.vercel.app/"
              )}`}
              target="_blank"
            >
              <div className="p-2 hover:bg-gray-200 transition-colors duration-150 rounded-full text-gray-400 hover:text-gray-600">
                <Twitter size={20} />
              </div>
            </Link>
            <Link
              href="https://github.com/alirmemon37/trip-architect"
              target="_blank"
            >
              <div className="p-2 hover:bg-gray-200 transition-colors duration-150 rounded-full text-gray-400 hover:text-gray-600">
                <Github size={20} />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
