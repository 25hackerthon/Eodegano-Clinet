import { createContext, useContext, ReactNode } from "react";

interface tripIdContextType {
  tripId: number;
  tripIdString: number;
}

const TripContext = createContext<tripIdContextType | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const tripIdString = localStorage.getItem("tripId");
  const tripId = tripIdString ? Number(tripIdString) : null;

  console.log("tripId", tripId);

  const value = {
    tripId,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTripId() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
