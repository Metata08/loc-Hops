import { ArrowLeft, Download, Share2, Printer, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Language } from "@/i18n/translations";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import { QRCodeSVG } from 'qrcode.react';
import { useState, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";

interface QRCodeScreenProps {
  service: string;
  language: Language;
  onNavigate: (screen: "welcome" | "services" | "map") => void;
  onLanguageChange: (lang: Language) => void;
}

const QRCodeScreen = ({ service, language, onNavigate, onLanguageChange }: QRCodeScreenProps) => {
  const { t } = useTranslation(language);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Données du service avec URLs
  const serviceInfo = {
    radiologie: { 
      nameKey: "radiology", 
      building: t("buildingB"), 
      floor: t("floor1"),
      url: "https://hospital.com/navigation/radiologie",
      color: "#3B82F6"
    },
    maternite: { 
      nameKey: "maternity", 
      building: t("buildingD"), 
      floor: t("floor3"),
      url: "https://hospital.com/navigation/maternite",
      color: "#EC4899"
    },
    urgences: { 
      nameKey: "emergency", 
      building: t("buildingA"), 
      floor: t("groundFloor"),
      url: "https://hospital.com/navigation/urgences",
      color: "#EF4444"
    },
    reception: { 
      nameKey: "reception", 
      building: t("buildingA"), 
      floor: t("groundFloor"),
      url: "https://hospital.com/navigation/reception",
      color: "#10B981"
    },
    cardiologie: { 
      nameKey: "cardiology", 
      building: t("buildingC"), 
      floor: t("floor2"),
      url: "https://hospital.com/navigation/cardiologie",
      color: "#8B5CF6"
    },
    consultation: { 
      nameKey: "consultation", 
      building: t("buildingA"), 
      floor: t("floor1"),
      url: "https://hospital.com/navigation/consultation",
      color: "#F59E0B"
    },
    pharmacie: { 
      nameKey: "pharmacy", 
      building: t("buildingA"), 
      floor: t("groundFloor"),
      url: "https://hospital.com/navigation/pharmacie",
      color: "#06B6D4"
    },
    laboratoire: { 
      nameKey: "laboratory", 
      building: t("buildingB"), 
      floor: t("groundFloor"),
      url: "https://hospital.com/navigation/laboratoire",
      color: "#6366F1"
    },
    chirurgie: { 
      nameKey: "surgery", 
      building: t("buildingC"), 
      floor: t("floor4"),
      url: "https://hospital.com/navigation/chirurgie",
      color: "#DC2626"
    },
  };

  const info = serviceInfo[service as keyof typeof serviceInfo] || serviceInfo.radiologie;
  const serviceName = t(info.nameKey as any);
  const qrData = JSON.stringify({
    service: serviceName,
    building: info.building,
    floor: info.floor,
    url: info.url,
    timestamp: new Date().toISOString()
  });

  const handleDownload = () => {
    const svg = document.querySelector('.qr-code svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-code-${serviceName.toLowerCase().replace(/\s+/g, '-')}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${serviceName} - ${t("qrNavigation")}`,
          text: `${t("scanMessage")}`,
          url: info.url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(info.url);
      setCopied(true);
      toast({
        title: t("confirm"),
        description: t("confirm"),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrint = () => {
    const printContent = qrRef.current?.innerHTML;
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>${serviceName} - QR Code</title>
          <style>
            body { 
              font-family: sans-serif; 
              text-align: center; 
              padding: 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .service-info { 
              margin-bottom: 30px; 
            }
            .qr-container {
              border: 2px solid #000;
              padding: 20px;
              display: inline-block;
              margin: 20px 0;
            }
            .instructions {
              margin-top: 30px;
              color: #666;
              font-size: 14px;
            }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="service-info">
            <h1>${serviceName}</h1>
            <p><strong>${info.building} • ${info.floor}</strong></p>
            <p>${new Date().toLocaleDateString()}</p>
          </div>
          <div class="qr-container">
            ${document.querySelector('.qr-code svg')?.outerHTML || ''}
          </div>
          <div class="instructions">
            <p>${t("scanMessage")}</p>
            <p>${t("scanQR")}</p>
          </div>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 animate-gentle-fade-in">
      {/* Header */}
      <div className="p-6 border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => onNavigate("map")}
            className="text-lg hover:bg-primary/10"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            {t("back")}
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("qrNavigation")}
          </h1>
          <LanguageSwitcher currentLanguage={language} onLanguageChange={onLanguageChange} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl w-full space-y-8" ref={qrRef}>
          <Card className="p-6 md:p-12 text-center space-y-8 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50">
            <div className="space-y-4">
              <div className="inline-block px-6 py-2 rounded-full bg-primary/10">
                <p className="text-sm font-medium text-primary">{t("qrNavigation")}</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{serviceName}</h2>
              <div className="flex items-center justify-center gap-4 text-lg text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
                  {info.building}
                </span>
                <span>•</span>
                <span>{info.floor}</span>
              </div>
            </div>

            {/* QR Code réel */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="qr-code p-8 bg-white rounded-3xl shadow-2xl border-8 border-white">
                <QRCodeSVG
                  value={qrData}
                  size={280}
                  level="H"
                  includeMargin
                  bgColor="#FFFFFF"
                  fgColor={info.color}
                  imageSettings={{
                    src: "/hospital-logo.svg",
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-sm text-gray-500 font-medium">{t("scanQR")}</p>
                
                {/* URL copiable */}
                <div className="flex items-center justify-center gap-2">
                  <code className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-mono text-gray-700 truncate max-w-xs">
                    {info.url}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="h-10"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("scanMessage")}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              onClick={handleShare}
            >
              <Share2 className="h-6 w-6 mr-3" />
              <span className="text-lg font-medium">{t("share")}</span>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              onClick={handleDownload}
            >
              <Download className="h-6 w-6 mr-3" />
              <span className="text-lg font-medium">{t("download")}</span>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              onClick={handlePrint}
            >
              <Printer className="h-6 w-6 mr-3" />
              <span className="text-lg font-medium">{t("print")}</span>
            </Button>

            <Button 
              size="lg" 
              className="h-16 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => onNavigate("services")}
            >
              <span className="text-lg font-medium">{t("newSearch")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;