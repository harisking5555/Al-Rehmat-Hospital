import React from 'react';
import { ShieldCheck, Heart, Microscope, Clock, Building2, Stethoscope } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface AboutPageProps {
  onOpenBooking: () => void;
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, setActiveTab }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner with Hospital Photo Background */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20">
        <div className="absolute inset-0 opacity-80">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600"
            alt="Hospital Facility"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-900/25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
            Compassionate Healthcare
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight">
            About Al Rehmat Hospital
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Providing accessible, tertiary-grade clinical care, 24/7 emergency response, and certified Chughtai Lab diagnostics in Gujranwala.
          </p>
        </div>
      </section>

      {/* 2. Patron Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest block">
            Our Purpose & Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 leading-tight">
            "High-Quality Clinical Care for Every Family"
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Al Rehmat Hospital was founded to deliver top-tier specialist care right here in Warpal Chattha and Gujranwala. Under the medical patronage of <strong>Dr. Muhammad Aslam Raza (D.H.M.S, R.H.M.P)</strong>, we bring together recognized consultants in Gynecology, Pediatrics, Urology, ENT, and Physiotherapy, backed by round-the-clock emergency services and official Chughtai Lab diagnostic facilities.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 text-xs">
            <div>
              <span className="text-2xl font-black font-heading text-red-600 block">24/7</span>
              <span className="text-slate-500 font-medium">Emergency Care</span>
            </div>
            <div>
              <span className="text-2xl font-black font-heading text-slate-900 block">6+</span>
              <span className="text-slate-500 font-medium">Specialist Wings</span>
            </div>
            <div>
              <span className="text-2xl font-black font-heading text-red-600 block">Chughtai</span>
              <span className="text-slate-500 font-medium">Official Lab Center</span>
            </div>
            <div>
              <span className="text-2xl font-black font-heading text-slate-900 block">10,000+</span>
              <span className="text-slate-500 font-medium">Patients Treated</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Sterilization & Hygiene
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Autoclave sterilization and hospital-grade sanitization protocols across all labor rooms, wards, and operation theatres.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Female Staff for Maternity
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experienced female doctors, lady health visitors, and nurses ensuring dignity, privacy, and supportive maternal care.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
              Certified Diagnostics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fast, automated blood analysis through Chughtai Healthcare for accurate clinical diagnosis and tailored treatment.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold font-heading">Need Doctor Consultation?</h3>
            <p className="text-xs text-slate-400 mt-1">Book your appointment token or contact our reception desk.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Book Appointment
          </button>
        </div>
      </section>

    </div>
  );
};
