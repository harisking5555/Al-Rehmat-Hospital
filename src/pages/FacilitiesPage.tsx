import React, { useState } from 'react';
import { Microscope, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { FACILITIES_DATA, CHUGHTAI_LAB_TESTS, HOSPITAL_INFO } from '../data/hospitalData';

export const FacilitiesPage: React.FC = () => {
  const [testSearch, setTestSearch] = useState('');
  const [testCategory, setTestCategory] = useState('All');

  // Home sampling form state
  const [samplingName, setSamplingName] = useState('');
  const [samplingPhone, setSamplingPhone] = useState('');
  const [samplingAddress, setSamplingAddress] = useState('');
  const [samplingTests, setSamplingTests] = useState('');
  const [samplingSubmitted, setSamplingSubmitted] = useState(false);

  const categories = ['All', 'Hematology', 'Biochemistry', 'Nephrology', 'Cardiac', 'Endocrinology', 'Hormones', 'Radiology'];

  const filteredTests = CHUGHTAI_LAB_TESTS.filter((test) => {
    const matchesCat = testCategory === 'All' || test.category.toLowerCase().includes(testCategory.toLowerCase());
    const matchesSearch = test.name.toLowerCase().includes(testSearch.toLowerCase()) ||
                          test.description.toLowerCase().includes(testSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSamplingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!samplingName.trim() || !samplingPhone.trim()) return;

    const message = `*Chughtai Lab Home Sampling Request - Al Rehmat Hospital*\n` +
      `--------------------------------------\n` +
      `*Patient Name:* ${samplingName}\n` +
      `*Phone:* ${samplingPhone}\n` +
      `*Address:* ${samplingAddress}\n` +
      `*Tests Requested:* ${samplingTests || 'General Profile'}\n` +
      `--------------------------------------\n` +
      `_Please dispatch a phlebotomist for home blood sample collection._`;

    window.open(`https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setSamplingSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20">
        <div className="absolute inset-0 opacity-80">
          <img
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=1600"
            alt="Hospital Facilities"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-900/25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
            Clinical Infrastructure
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight">
            Facilities & Diagnostics
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            24/7 Emergency trauma care, labor rooms, and official <strong>Chughtai Healthcare</strong> diagnostic center.
          </p>
        </div>
      </section>

      {/* 2. Facilities Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES_DATA.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-3 left-4 text-xs font-bold text-white bg-red-600 px-2.5 py-1 rounded-md">
                    {facility.hours}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-red-600 font-semibold">
                    {facility.tagline}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {facility.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`tel:${HOSPITAL_INFO.phoneRaw}`}
                  className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Inquire Facility Details</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Chughtai Lab Diagnostic Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
              Official Diagnostic Partner
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
              Chughtai Lab 24/7 Diagnostics
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Automated hematology, biochemistry, and hormone profiles with barcode tracking and digital reports sent directly to WhatsApp.
            </p>
          </div>
        </div>

        {/* Tests Search & Filter */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search lab test (e.g. CBC, LFT, Sugar)..."
                value={testSearch}
                onChange={(e) => setTestSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTestCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    testCategory === cat
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                    {test.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {test.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {test.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">{test.turnaroundTime}</span>
                  <a
                    href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hello, I would like to inquire about the ${test.name} test at Chughtai Lab Al Rehmat.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Home Blood Sampling Request Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block">
                Homecare Sampling
              </span>
              <h3 className="text-2xl font-black font-heading text-slate-900">
                Blood Sample Collection at Home
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Need tests for an elderly or bedridden patient? Our certified phlebotomists will collect samples at your home in Gujranwala with sterile equipment.
              </p>
            </div>

            <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              {samplingSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <h4 className="text-base font-bold text-slate-900">Request Sent to WhatsApp</h4>
                  <p className="text-xs text-slate-600">Our lab coordinator will confirm your sample collection slot shortly.</p>
                  <button
                    onClick={() => setSamplingSubmitted(false)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSamplingSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ahmad Ali"
                        value={samplingName}
                        onChange={(e) => setSamplingName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0319-1234567"
                        value={samplingPhone}
                        onChange={(e) => setSamplingPhone(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Home Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Area, Gujranwala"
                      value={samplingAddress}
                      onChange={(e) => setSamplingAddress(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Home Sampling Request via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </section>

    </div>
  );
};
