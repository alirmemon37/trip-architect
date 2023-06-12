import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen p-4">
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
  );
}
