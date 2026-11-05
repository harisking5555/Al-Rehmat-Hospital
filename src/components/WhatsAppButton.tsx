import React from 'react';
import { MessageCircle } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const WhatsAppButton: React.FC = () => {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello Al Rehmat Hospital, I would like to inquire about appointments and medical services.");
    window.open(`https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Icon-only circular WhatsApp button with subtle pulse */}
      <button
        onClick={openWhatsApp}
        className="relative w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none cursor-pointer"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 ring-2 ring-emerald-600 animate-ping"></span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
};
