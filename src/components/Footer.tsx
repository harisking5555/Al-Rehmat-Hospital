import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-white text-slate-800 pt-16 pb-12 border-t border-slate-200 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Column 1: Hospital Logo & About */}
          <div className="space-y-4">
            <div className="h-18 flex items-center">
              <img
                src={HOSPITAL_INFO.logo}
                alt="Al Rehmat Hospital Logo"
                className="h-16 w-auto max-w-[220px] object-contain rounded-xl shadow-xs border border-slate-200 bg-white p-1"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-xs leading-relaxed text-slate-600 font-normal">
              24/7 Emergency response, specialized maternal care, pediatric medicine, urology, and official Chughtai Lab diagnostics in Gujranwala.
            </p>

            <div className="text-xs text-slate-600">
              <span className="text-slate-900 font-bold block mb-0.5">Medical Patron:</span>
              <span className="text-slate-700">{HOSPITAL_INFO.patron}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (Clean Dark Slate on White) */}
          <div className="space-y-3">
            <h5 className="font-heading font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium text-slate-700 hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium text-slate-700 hover:underline"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium text-slate-700 hover:underline"
                >
                  Departments & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('doctors')}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium text-slate-700 hover:underline"
                >
                  Specialist Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('facilities')}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium text-slate-700 hover:underline"
                >
                  Facilities & Chughtai Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-red-600 transition-colors cursor-pointer font-medium text-slate-700 hover:underline"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Medical Specialties */}
          <div className="space-y-3">
            <h5 className="font-heading font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Specialties
            </h5>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>24/7 Emergency & Acute Triage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>Gynecology & Infertility Care</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>Pediatrics & Child Health</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>Diagnostic Ultrasound & Imaging</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>Urology & Kidney Stone Care</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>ENT & Sinus Surgeries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                <span>Chughtai Lab 24/7 Diagnostics</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Phone Numbers */}
          <div className="space-y-3">
            <h5 className="font-heading font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Emergency & Inquiries
            </h5>

            <div className="space-y-3 text-xs text-slate-600">
              {/* Direct SIM Mobile Call Number */}
              <a
                href={`tel:${HOSPITAL_INFO.directCallRaw}`}
                className="flex items-start gap-2.5 text-slate-800 hover:text-red-600 transition-colors group p-2 rounded-xl bg-slate-50 border border-slate-200"
              >
                <Phone className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">Direct Call Helpline (SIM):</span>
                  <span className="font-extrabold text-sm text-slate-900 group-hover:text-red-600">
                    {HOSPITAL_INFO.directCallPhone}
                  </span>
                </div>
              </a>

              {/* Emergency Hotline / WhatsApp Number */}
              <a
                href={`tel:${HOSPITAL_INFO.phoneRaw}`}
                className="flex items-start gap-2.5 text-slate-800 hover:text-red-600 transition-colors group p-2 rounded-xl bg-slate-50 border border-slate-200"
              >
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">WhatsApp & Reception:</span>
                  <span className="font-extrabold text-sm text-slate-900 group-hover:text-red-600">
                    {HOSPITAL_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${HOSPITAL_INFO.email}`}
                className="flex items-start gap-2 text-slate-700 hover:text-red-600 transition-colors pt-1"
              >
                <Mail className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="break-all font-medium">{HOSPITAL_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="font-medium">{HOSPITAL_INFO.address}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold text-slate-900">Open 24 Hours / 7 Days a Week</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                Book Consultation Token
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Clean Light Footer) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-slate-600 font-medium">© {new Date().getFullYear()} Al Rehmat Hospital, Gujranwala. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified PMDC Specialists</span>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
