import React from 'react';

const EmergencyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 1h-2v10h2V1zm-1 14c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6.66-2.66l-1.42 1.42c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.42-1.42c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.38-1.41 0zM4.34 12.34l-1.42-1.42c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.42 1.42c.39.39 1.02.39 1.41 0 .39-.38.39-1.02 0-1.41zM12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
  </svg>
);

// FIX: Add default export to allow the component to be imported correctly.
export default EmergencyIcon;