
import React from 'react';

const BabyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-7 8v-1.5c0-1.38 2.24-2.5 5-2.5s5 1.12 5 2.5V18H5zm14-2.5c0-1.38 2.24-2.5 5-2.5s5 1.12 5 2.5V18h-10v-2.5zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    <circle cx="12" cy="7" r="3"/>
    <path d="M5 18v-1.5c0-1.38 2.24-2.5 5-2.5h4c2.76 0 5 1.12 5 2.5V18H5zm11-1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export default BabyIcon;
