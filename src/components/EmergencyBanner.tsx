import React from 'react';

export const EmergencyBanner: React.FC = () => {
  const tickerItems = [
    "24/7 EMERGENCY ACTIVE · IMMEDIATE TRIAGE & TRAUMA CARE",
    "OFFICIAL CHUGHTAI LAB DIAGNOSTIC COLLECTION CENTER · 24/7 BLOOD TESTS",
    "FREE MEDICAL CAMP · PEDIATRIC & GENERAL MEDICINE SCREENINGS",
    "CONSULTANT GYNECOLOGISTS & MATERNITY WING · FEMALE DOCTORS AVAILABLE",
    "24/7 HELPLINE & WHATSAPP: 0319-1401391 · VERPAL CHATTA, SAIM NALA, GUJRANWALA",
  ];

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-xs py-2 overflow-hidden border-b border-red-900 select-none">
      <div className="flex w-max animate-marquee space-x-8 items-center font-bold tracking-wider text-[11px] sm:text-xs">
        {tickerItems.concat(tickerItems).map((text, idx) => (
          <div key={idx} className="flex items-center space-x-3 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></span>
            <span>{text}</span>
            <span className="text-red-300 font-normal">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};
