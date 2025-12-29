
import React from 'react';

export const MEDICAL_DISCLAIMER = "CARDEON is an academic project developed for educational and research purposes. Predictions are not a substitute for professional medical diagnosis.";

export const COLORS = {
  primary: '#991b1b', // Blood Red
  primaryDark: '#7f1d1d', // Maroon
  secondary: '#4b5563', 
  border: '#f3f4f6', 
  background: '#ffffff',
};

export const HeartIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.557 0 3.046.727 4 2.015C12.454 3.727 13.943 3 15.5 3 18.286 3 20.75 5.322 20.75 8.25c0 3.924-2.438 7.11-4.739 9.272a25.178 25.178 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" />
  </svg>
);
