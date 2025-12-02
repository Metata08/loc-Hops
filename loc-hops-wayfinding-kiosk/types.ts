import type React from 'react';

export enum Screen {
  Welcome,
  Destination,
  Route,
  MobileView
}

export type Language = 'fr' | 'wo' | 'ar';

export interface Destination {
  key: string;
  name: string;
  location: string;
  walkTime: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  floorChangeInstruction?: {
    [key in Language]: string;
  };
}
