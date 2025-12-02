import React from 'react';

const PharmacyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 9h-2V7h2v2zm-2 2h2v2h-2v-2zm12-2H7c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zM3 21V6c0-1.1.9-2 2-2h14v2H5v15H3z"/>
  </svg>
);

// FIX: Add default export to allow the component to be imported correctly.
export default PharmacyIcon;