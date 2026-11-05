import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { DEPARTMENTS_DATA, HOSPITAL_INFO } from '../data/hospitalData';

interface DepartmentsPageProps {
  onOpenBooking: (doctorId?: string) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ onOpenBooking }) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');

  const filteredDepts = selectedDeptId === 'all'
    ? DEPARTMENTS_DATA
    : DEPARTMENTS_DATA.filter((d) => d.id === selectedDeptId);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner with Hospital Image Background */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20">
        <div className="absolute inset-0 opacity-80">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600"
            alt="Medical Services"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-900/25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
            Clinical Excellence
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight">
            Departments & Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Specialized departments led by experienced PMDC certified consultants and surgeons.
          </p>
        </div>
      </section>

      {/* 2. Interactive Department Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedDeptId === 'all'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Departments ({DEPARTMENTS_DATA.length})
          </button>
          
          {DEPARTMENTS_DATA.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDeptId === dept.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* 3. Clean Spacious Department Cards */}
        <div className="mt-10 space-y-10">
          {filteredDepts.map((dept, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden p-6 sm:p-10"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Image banner */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-16/10 shadow-sm border border-slate-100">
                      <img
                        src={dept.image}
                        alt={dept.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
                      <Clock className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{dept.operatingHours}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                        Specialty Wing
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
                        {dept.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {dept.description}
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Key Services:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dept.keyServices.map((service, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 flex items-center gap-3">
                      <button
                        onClick={() => onOpenBooking()}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Appointment Token</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
