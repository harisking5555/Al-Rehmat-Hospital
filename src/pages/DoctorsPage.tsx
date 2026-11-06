import React, { useState } from 'react';
import { Clock, Search, CheckCircle2, MessageCircle } from 'lucide-react';
import { DOCTORS_DATA, HOSPITAL_INFO } from '../data/hospitalData';
import { DoctorAvatar } from '../components/DoctorAvatar';

interface DoctorsPageProps {
  onOpenBooking: (doctorId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const departmentsList = [
    'all',
    'General Medicine & Emergency',
    'Gynecology & Obstetrics',
    'Pediatrics & General Medicine',
    'Diagnostic Ultrasound & Imaging',
    'Urology & Kidney Care',
    'ENT (Ear, Nose, Throat)',
    'Physiotherapy & Rehabilitation',
  ];

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesDept = selectedDept === 'all' || doc.department === selectedDept;
    const matchesQuery = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesQuery;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20">
        <div className="absolute inset-0 opacity-80">
          <img
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600"
            alt="Doctors Faculty"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-900/25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
            Specialist Panel
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight">
            Consultant Doctors
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experienced medical officers, teaching hospital registrars, and gold medalists available for consultations.
          </p>
        </div>
      </section>

      {/* 2. Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {departmentsList.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept === 'all' ? 'All Doctors' : dept.split('&')[0]}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Doctors Cards Grid (Using Clean Avatars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-4">
                  {/* Doctor Photograph or Avatar */}
                  <DoctorAvatar 
                    gender={doc.gender} 
                    image={doc.image} 
                    name={doc.name} 
                    className="w-18 h-18 shrink-0" 
                  />

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wide block truncate">
                      {doc.department}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-snug mt-1 break-words">
                      {doc.name}
                    </h3>
                    {doc.qualification ? (
                      <p className="text-xs text-slate-500 font-medium leading-normal mt-1.5 break-words">
                        {doc.qualification}
                      </p>
                    ) : null}
                    {doc.isGoldMedalist && (
                      <span className="inline-block mt-1.5 text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Gold Medalist
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2 mb-3">
                  <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="font-semibold">{doc.timing}</span>
                </div>

                <div className="space-y-1 mb-4">
                  {doc.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onOpenBooking(doc.id)}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                >
                  Book Token
                </button>
                <a
                  href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I would like to book a consultation token with ${doc.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Complete OPD Timetable */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="mb-6">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Consultation Schedule
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
              Weekly OPD Timetable
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Doctor Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Days</th>
                  <th className="py-3 px-4">Timings</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {DOCTORS_DATA.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{doc.name}</div>
                      {doc.qualification ? (
                        <div className="text-[11px] font-normal text-slate-400">{doc.qualification}</div>
                      ) : null}
                    </td>
                    <td className="py-3.5 px-4 text-red-700 font-medium">{doc.department}</td>
                    <td className="py-3.5 px-4 font-medium">{doc.days.join(', ')}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{doc.timing}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenBooking(doc.id)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-[11px]"
                      >
                        Book Token
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

    </div>
  );
};
