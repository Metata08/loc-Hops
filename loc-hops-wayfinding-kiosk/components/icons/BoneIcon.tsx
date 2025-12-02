import React from 'react';

const BoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.9,10.7c-0.6-0.6-1.6-0.6-2.2,0L14,14.4l-3.3-3.3c-0.6-0.6-1.6-0.6-2.2,0c-1.4,1.4-0.4,4.6,1.4,6.4 c1.8,1.8,5,2.8,6.4,1.4c0.6-0.6,0.6-1.6,0-2.2L13,13.3l3.3,3.3c0.6,0.6,1.6,0.6,2.2,0l3.3-3.3C20.5,12.3,20.5,11.3,19.9,10.7z M6.4,5.3C4.6,3.5,1.4,2.6,0,4C-0.6,4.6-0.6,5.5,0,6.1l3.3,3.3l3.3-3.3c0.6-0.6,0.6-1.6,0-2.2L6.4,5.3z"/>
  </svg>
);

// FIX: Add default export to allow the component to be imported correctly.
export default BoneIcon;