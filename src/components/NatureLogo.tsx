import React from 'react';

interface NatureLogoProps {
  className?: string;
}

export const NatureLogo: React.FC<NatureLogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      id="nature-the-cure-logo-svg"
    >
      {/* Human Figure as Tree Trunk */}
      <path 
        d="M50 48C53.3137 48 56 45.3137 56 42C56 38.6863 53.3137 36 50 36C46.6863 36 44 38.6863 44 42C44 45.3137 46.6863 48 50 48Z" 
        fill="#2160ae" 
      />
      <path 
        d="M50 92L47 70C43 65 30 65 30 65C30 65 50 63 50 50C50 63 70 65 70 65C70 65 57 65 53 70L50 92Z" 
        fill="#2160ae"
      />
      
      {/* Branches/Arms */}
      <path 
        d="M50 65C58 65 65 55 65 40M50 65C42 65 35 55 35 40" 
        stroke="#2160ae" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      
      {/* Specific Leaf Arrangement based on image */}
      <g id="leaves">
        {/* Left Side Group */}
        <path d="M25 25C15 15 10 30 25 35C40 40 35 25 25 25Z" fill="#7aca55" /> {/* Green top left */}
        <path d="M20 40C5 40 5 55 20 50C35 45 35 40 20 40Z" fill="#2160ae" /> {/* Blue middle left */}
        <path d="M25 60C15 65 15 80 25 75C35 70 35 60 25 60Z" fill="#7aca55" /> {/* Green bottom left */}
        
        {/* Top Center Detail */}
        <path d="M42 15C35 5 45 5 48 15C51 25 45 25 42 15Z" fill="#2160ae" /> {/* Blue top far left tilt */}
        <path d="M55 25C52 15 62 15 65 25C68 35 62 35 55 25Z" fill="#7aca55" /> {/* Green top small */}
        
        {/* Center top Blue */}
        <path d="M48 25C48 10 52 10 52 25C52 40 48 40 48 25Z" fill="#2160ae" />
        
        {/* Right Side Group */}
        <path d="M75 25C85 15 90 30 75 35C60 40 65 25 75 25Z" fill="#2160ae" /> {/* Blue top right */}
        <path d="M80 45C95 45 95 55 80 55C65 55 65 45 80 45Z" fill="#7aca55" /> {/* Green middle right */}
        <path d="M70 55C80 55 85 70 70 70C55 70 60 55 70 55Z" fill="#2160ae" /> {/* Blue bottom right */}
      </g>

      {/* Base Line */}
      <rect x="30" y="92" width="40" height="2" rx="1" fill="#2160ae" />
    </svg>
  );
};
