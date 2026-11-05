import React, { useState } from 'react';

interface DoctorAvatarProps {
  gender: 'male' | 'female';
  image?: string;
  name?: string;
  className?: string;
}

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({ 
  gender, 
  image, 
  name, 
  className = "w-16 h-16" 
}) => {
  const [imageError, setImageError] = useState(false);

  // If real doctor photograph is provided and loads successfully
  if (image && !imageError) {
    return (
      <div
        className={`rounded-2xl overflow-hidden shrink-0 border-2 border-red-500/20 shadow-sm bg-slate-100 relative group ${className}`}
      >
        <img
          src={image}
          alt={name || "Doctor"}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Elegant fallback silhouette
  return (
    <div
      className={`rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs overflow-hidden ${
        gender === 'female' ? 'bg-gradient-to-br from-rose-50 to-rose-100/60' : 'bg-gradient-to-br from-slate-50 to-blue-50/60'
      } ${className}`}
    >
      {gender === 'female' ? (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-2"
        >
          <path
            d="M32 12C24 12 20 18 20 26C20 33 22 37 24 40C26 36 29 35 32 35C35 35 38 36 40 40C42 37 44 33 44 26C44 18 40 12 32 12Z"
            fill="#cbd5e1"
          />
          <circle cx="32" cy="24" r="8" fill="#64748b" />
          <path
            d="M18 52C18 43 24 39 32 39C40 39 46 43 46 52C46 54 45 55 44 55H20C19 55 18 54 18 52Z"
            fill="#94a3b8"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-2"
        >
          <circle cx="32" cy="23" r="8.5" fill="#64748b" />
          <path
            d="M16 52C16 42 23 38 32 38C41 38 48 42 48 52C48 54 47 55 46 55H18C17 55 16 54 16 52Z"
            fill="#94a3b8"
          />
        </svg>
      )}
    </div>
  );
};
