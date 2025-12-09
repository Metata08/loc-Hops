import React, { createContext, useContext, ReactNode } from "react";
import { 
  useGLBServices, 
  GLBService, 
  getServicePositions,
  fallbackServices 
} from "@/hooks/useGLBServices";

interface ServicesContextType {
  services: GLBService[];
  servicePositions: Record<string, [number, number, number]>;
  loading: boolean;
  error: string | null;
  modelLoaded: boolean;
  usingFallback: boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const { 
    services: glbServices, 
    loading, 
    error, 
    modelLoaded 
  } = useGLBServices("/models/hospital.glb");

  // Utilise les services GLB s'ils existent, sinon fallback
  const usingFallback = !loading && (!modelLoaded || glbServices.length === 0);
  const services = usingFallback ? fallbackServices : glbServices;

  const servicePositions = getServicePositions(services);

  return (
    <ServicesContext.Provider
      value={{
        services,
        servicePositions,
        loading,
        error,
        modelLoaded,
        usingFallback,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}