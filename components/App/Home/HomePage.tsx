import React, { useEffect } from "react";
import CreateTripButton from "../General/CreateTripButton";
import { useAppViewStore } from "@/store/AppViewStore";
import TripStats from "./TripStats";
import { useUserStore } from "@/store/UserStore";
import { useTripStore } from "@/store/TripStore";
import getNumberOfPlacesOfTrip from "@/lib/getNumberOfPlacesOfTrip";
import getUpcomingTrip from "@/lib/getUpcomingTrip";
import { useRouter } from "next/navigation";
import HomePageFeature from "./HomePageFeature";

const HomePage = () => {
  const setView = useAppViewStore((state) => state.setView);
  const [trips, getTrips, tripsLoading] = useTripStore((state) => [
    state.trips,
    state.getTrips,
    state.tripLoading,
  ]);
  const userId = useUserStore((state) => state.user?.$id);

  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      await getTrips(userId!);
    };

    fetchTrips();
  }, [getTrips, userId]);

  return (
    <div className="p-4 md:py-6 md:px-10">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
        Welcome to TripArchitect 🛠️
      </h1>

      <div className="flex gap-6 flex-wrap">
        <TripStats
          numTrips={trips.length}
          numPlaces={trips.reduce((acc, trip) => {
            return acc + getNumberOfPlacesOfTrip(trip);
          }, 0)}
        />
        <div>
          <h2 className="mb-2 text-2xl font-bold">Upcoming Trip</h2>
          <div
            onClick={() => {
              if (getUpcomingTrip(trips)) {
                router.push(`/app/trip/${getUpcomingTrip(trips)?.$id}`);
              } else {
                setView("trips");
              }
            }}
            className="flex gap-6 cursor-pointer"
          >
            <div className="min-w-[160px] min-h-[120px] p-4 bg-gray-100 rounded-lg flex flex-col items-center hover:bg-gray-300 transition-colors duration-150">
              <span className="text-lg font-bold">Name</span>
              {tripsLoading ? (
                <span className="text-6xl font-bold">Loading...</span>
              ) : (
                <span className="text-6xl font-bold tracking-tighter">
                  {getUpcomingTrip(trips)?.name.length! > 12
                    ? getUpcomingTrip(trips)?.name.substring(0, 12) + "..."
                    : getUpcomingTrip(trips)?.name || "No upcoming trip"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4 flex flex-col">
        <p className="text-secondary font-bold md:w-6/12 text-2xl mb-4">
          Get started with TripArchitect:
        </p>
        <HomePageFeature
          title="Create a Trip"
          description='Click the "Create Trip" button to start creating your trip'
          cta={
            <>
              <p className="text-sm mb-3">
                You can see all your trips in{" "}
                <span
                  onClick={() => setView("trips")}
                  className="underline cursor-pointer"
                >
                  Trips
                </span>
              </p>
              <CreateTripButton />
            </>
          }
        />

        <HomePageFeature
          title="Add places to your trip"
          description="View or add places to your trip with map search"
        />
        <HomePageFeature
          title="Visualize your trip"
          description="View all your places on the Trip Board and rearrange them"
        />
        <HomePageFeature
          title="View your places on the map"
          description="See all the places of your trip on the map"
          cta={
            <>
              <p className="text-sm mb-3">
                You can see your trip places in{" "}
                <span
                  onClick={() => setView("map")}
                  className="underline cursor-pointer"
                >
                  Map
                </span>
              </p>
            </>
          }
        />
        <HomePageFeature
          title="Personalize the app"
          description="Set an avatar for your profile"
        />
      </div>
    </div>
  );
};

export default HomePage;
