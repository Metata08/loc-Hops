import React from 'react';

const LabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.5 13.75c-1.3 0-2.43.8-2.82 1.94L11 11.82V6h2V4H7v2h2v5.82l-5.68 3.87C3.07 14.55 1.95 13.75 0.5 13.75v2c1.3 0 2.43-.8 2.82-1.94L9 11.18V18H7v2h10v-2h-2v-6.82l5.68-3.87c.39 1.14 1.52 1.94 2.82 1.94v-2z"/>
  </svg>
);

// FIX: Add default export to allow the component to be imported correctly.
export default LabIcon;