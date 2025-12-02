import { type FC } from 'react';
import type { Language } from '../types';
import HospitalMap3D from './HospitalMap3D';

interface HospitalMapProps {
  destinationKey?: string;
  youAreHereText?: string;
  language: Language;
  isMobile?: boolean;
}

const HospitalMap: FC<HospitalMapProps> = ({
  destinationKey,
  youAreHereText,
  language,
  isMobile = false,
}) => {
  return (
    <div className={`w-full h-full flex flex-col ${isMobile ? 'p-2' : 'p-4'} items-center justify-center`}>
      {youAreHereText && (
        <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-brand-secondary mb-4 text-center`}>
          {youAreHereText}
        </div>
      )}

      {/* Affichage de la carte 3D */}
      <HospitalMap3D
        destinationKey={destinationKey}
        language={language}
        isMobile={isMobile}
      />
    </div>
  );
};

export default HospitalMap;