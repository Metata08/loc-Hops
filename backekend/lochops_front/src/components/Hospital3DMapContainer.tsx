// components/Hospital3DMapContainer.tsx
import React, { useState } from "react";
import Hospital3DMap from "./Hospital3DMap";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Navigation, X, Maximize2, Minimize2 } from "lucide-react";
import { useServices } from "@/contexts/ServicesContext";

interface Hospital3DMapContainerProps {
  initialService?: string;
  fullScreen?: boolean;
  onFullScreenToggle?: () => void;
}

const Hospital3DMapContainer = ({
  initialService,
  fullScreen = false,
  onFullScreenToggle
}: Hospital3DMapContainerProps) => {
  const { services } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<string | undefined>(initialService);
  const [showAllMarkers, setShowAllMarkers] = useState(false);
  
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };
  
  const clearSelection = () => {
    setSelectedService(undefined);
    setSearchTerm("");
  };
  
  const selectedServiceInfo = services.find(s => s.id === selectedService);
  
  return (
    <Card className={`${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full'} flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <Navigation className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">Navigation 3D</h2>
            <p className="text-sm text-muted-foreground">
              Explorez l'hôpital et trouvez votre chemin
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAllMarkers(!showAllMarkers)}
          >
            {showAllMarkers ? "Cacher les marqueurs" : "Afficher tous les services"}
          </Button>
          
          {onFullScreenToggle && (
            <Button
              variant="outline"
              size="icon"
              onClick={onFullScreenToggle}
            >
              {fullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Carte 3D */}
        <div className="lg:col-span-2">
          <div className="h-full">
            <Hospital3DMap
              targetService={selectedService}
              showPath={!!selectedService}
              onServiceClick={handleServiceSelect}
              showAllMarkers={showAllMarkers}
            />
          </div>
        </div>
        
        {/* Panneau latéral */}
        <div className="border-l p-4 space-y-4 overflow-y-auto">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* Service sélectionné */}
          {selectedServiceInfo && (
            <Card className="bg-primary/5 border-primary/20 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{selectedServiceInfo.name}</h3>
                  <div className="space-y-1 mt-2">
                    {selectedServiceInfo.building && (
                      <p className="text-sm text-muted-foreground">
                        📍 {selectedServiceInfo.building}
                      </p>
                    )}
                    {selectedServiceInfo.floor !== undefined && (
                      <p className="text-sm text-muted-foreground">
                        🏢 Étage {selectedServiceInfo.floor}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      📏 Position: [
                      {selectedServiceInfo.position[0].toFixed(1)}, 
                      {selectedServiceInfo.position[1].toFixed(1)}, 
                      {selectedServiceInfo.position[2].toFixed(1)}
                      ]
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSelection}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Obtenir les directions détaillées
              </Button>
            </Card>
          )}
          
          {/* Liste des services */}
          <div>
            <h4 className="font-medium mb-3">Services disponibles</h4>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {filteredServices.map((service) => (
                <Card
                  key={service.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedService === service.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {service.building || 'Bâtiment principal'} • Étage {service.floor ?? '?'}
                      </div>
                    </div>
                    {selectedService === service.id && (
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    )}
                  </div>
                </Card>
              ))}
              
              {filteredServices.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  Aucun service trouvé
                </div>
              )}
            </div>
          </div>
          
          {/* Instructions */}
          <Card className="bg-muted/30 p-4">
            <h4 className="font-medium mb-2">Instructions</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Cliquez sur un service pour le sélectionner</li>
              <li>• Utilisez la souris pour naviguer en 3D</li>
              <li>• Le chemin bleu montre l'itinéraire</li>
              <li>• Les points rouges sont vos destinations</li>
            </ul>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default Hospital3DMapContainer;