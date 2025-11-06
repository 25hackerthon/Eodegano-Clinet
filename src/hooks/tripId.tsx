
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TripContextType {
  tripId: number | null;
  setTripId: (id: number) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tripId, setTripId] = useState<number | null>(null);

  return (
    <TripContext.Provider value={{ tripId, setTripId }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripId = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTripId must be used within a TripProvider');
  }
  return context;
};
