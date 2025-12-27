import Hospital3DMap from "@/components/Hospital3DMap";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MobileMapPage = () => {
    const [searchParams] = useSearchParams();
    const targetServiceId = searchParams.get("to") || undefined;

    // Petit hack pour forcer le recalcul si l'ID change
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prev => prev + 1);
    }, [targetServiceId]);

    return (
        <div className="w-full h-screen bg-white flex flex-col">
            {/* Outil de debug réseau (optionnel, peut être retiré plus tard) */}
            {/* Outil de debug réseau (Retiré) */}

            <div className="flex-1 relative">
                <Hospital3DMap
                    key={key}
                    targetService={targetServiceId}
                    showPath={true}
                    showAllMarkers={false}
                />

                {/* Overlay simple pour mobile */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none">
                    <div className="bg-white/90 backdrop-blur shadow-lg px-4 py-2 rounded-full text-sm font-medium text-gray-800 pointer-events-auto border border-gray-200">
                        {targetServiceId ? "Suivez le chemin rouge" : "Carte de l'hôpital"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMapPage;
