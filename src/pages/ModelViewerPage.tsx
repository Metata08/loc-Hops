// pages/ModelViewerPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Hospital3DMapContainer from "@/components/Hospital3DMapContainer";

const ModelViewerPage = () => {
  const navigate = useNavigate();
  const [fullScreen, setFullScreen] = useState(false);
  
  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-40' : 'min-h-screen'} bg-background`}>
      {!fullScreen && (
        <div className="p-4 md:p-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Button>
        </div>
      )}
      
      <Hospital3DMapContainer
        fullScreen={fullScreen}
        onFullScreenToggle={() => setFullScreen(!fullScreen)}
      />
    </div>
  );
};

export default ModelViewerPage;