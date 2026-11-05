import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { HOSPITAL_INFO, FAQS_DATA } from '../data/hospitalData';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Doctor Appointment');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20">
        <div className="absolute inset-0 opacity-80">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600"
            alt="Contact Al Rehmat"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-slate-900/25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest block">
            24/7 Helpline & Location
          </span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black text-white tracking-tight">
            Contact & Appointments
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Get in touch with our reception desk or reserve a consultation token.
          </p>
        </div>
      </section>

      {/* 2. Key Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Direct Call (SIM)</span>
              <a href={`tel:${HOSPITAL_INFO.directCallRaw}`} className="text-base font-black text-slate-900 hover:text-red-600 transition-colors block">
                {HOSPITAL_INFO.directCallPhone}
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Emergency Helpline</span>
              <a href={`tel:${HOSPITAL_INFO.phoneRaw}`} className="text-base font-black text-slate-900 hover:text-red-600 transition-colors block">
                {HOSPITAL_INFO.phone}
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">WhatsApp Chat</span>
              <a 
                href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors block mt-0.5"
              >
                Instant WhatsApp →
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-lg border border-slate-200 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</span>
              <a href={`mailto:${HOSPITAL_INFO.email}`} className="text-xs font-bold text-slate-900 hover:text-red-600 transition-colors block break-all">
                {HOSPITAL_INFO.email}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Inquiry Form & Address */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
                Reach Us
              </span>
              <h2 className="text-2xl font-black font-heading text-slate-900">
                Send an Inquiry
              </h2>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Inquiry Received</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Our staff has received your message and will reach out to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ali Raza"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Doctor Appointment">Doctor Appointment</option>
                      <option value="Maternity Care">Maternity & Delivery</option>
                      <option value="Pediatrics">Child Health</option>
                      <option value="Urology">Urology & Stones</option>
                      <option value="Chughtai Lab">Chughtai Lab & Sampling</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Details of your inquiry or symptoms..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="text-xs font-bold text-slate-700 hover:text-red-600 cursor-pointer"
                  >
                    Book Doctor Token →
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Location & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-heading font-black text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Hospital Location</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                    Main Hospital & Emergency Complex:
                  </span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {HOSPITAL_INFO.address}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Consultation & Referral Unit:
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {HOSPITAL_INFO.secondaryBranch}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Operating Hours:
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    Emergency: 24/7 | OPD: Daily 10 AM – 7 PM
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Al Rehmat Hospital Warpal Chattha Gujranwala")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FAQs Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Help Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-red-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
