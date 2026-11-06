import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Printer, MessageCircle, FileText, AlertCircle } from 'lucide-react';
import { DEPARTMENTS_DATA, HOSPITAL_INFO } from '../data/hospitalData';
import { useDoctors } from '../context/DoctorContext';
import { AppointmentRequest } from '../types/hospital';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctorId,
}) => {
  const { doctors } = useDoctors();
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female' | 'other'>('female');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('Morning (10:00 AM - 01:00 PM)');
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRequest | null>(null);

  // Sync preselected doctor
  useEffect(() => {
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
      const doc = doctors.find((d) => d.id === preselectedDoctorId);
      if (doc) {
        setSelectedDept(doc.department);
      }
    } else if (!selectedDoctorId && doctors.length > 0) {
      setSelectedDoctorId(doctors[0].id);
      setSelectedDept(doctors[0].department);
    }
  }, [preselectedDoctorId, isOpen, doctors]);

  // Set default appointment date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setAppointmentDate(dateStr);
  }, []);

  if (!isOpen) return null;

  const handleDeptChange = (deptName: string) => {
    setSelectedDept(deptName);
    const matchingDocs = doctors.filter((d) => d.department.includes(deptName) || deptName.includes(d.department));
    if (matchingDocs.length > 0) {
      setSelectedDoctorId(matchingDocs[0].id);
    }
  };

  const handleDoctorChange = (docId: string) => {
    setSelectedDoctorId(docId);
    const doc = doctors.find((d) => d.id === docId);
    if (doc) {
      setSelectedDept(doc.department);
    }
  };

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      return;
    }

    const tokenNumber = Math.floor(1000 + Math.random() * 9000);
    const booking: AppointmentRequest = {
      id: `ARH-2026-${tokenNumber}`,
      patientName,
      patientPhone,
      patientAge,
      patientGender,
      doctorId: selectedDoctorId,
      doctorName: selectedDoctor ? selectedDoctor.name : 'Consultant On Duty',
      department: selectedDept || (selectedDoctor ? selectedDoctor.department : 'General OPD'),
      appointmentDate,
      appointmentTime,
      symptoms,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Confirmed',
    };

    setConfirmedBooking(booking);
    setIsSubmitted(true);

    // Save in local storage
    try {
      const existing = JSON.parse(localStorage.getItem('arh_appointments') || '[]');
      existing.unshift(booking);
      localStorage.setItem('arh_appointments', JSON.stringify(existing));
    } catch {
      // Ignore storage error
    }
  };

  const handleSendToWhatsApp = () => {
    if (!confirmedBooking) return;
    const text = `*New Appointment Confirmation - Al Rehmat Hospital*\n` +
      `--------------------------------------\n` +
      `*Token ID:* ${confirmedBooking.id}\n` +
      `*Patient Name:* ${confirmedBooking.patientName}\n` +
      `*Phone:* ${confirmedBooking.patientPhone}\n` +
      `*Age/Gender:* ${confirmedBooking.patientAge || 'N/A'} (${confirmedBooking.patientGender})\n` +
      `*Doctor:* ${confirmedBooking.doctorName}\n` +
      `*Department:* ${confirmedBooking.department}\n` +
      `*Date:* ${confirmedBooking.appointmentDate}\n` +
      `*Time Slot:* ${confirmedBooking.appointmentTime}\n` +
      `*Symptoms/Notes:* ${confirmedBooking.symptoms || 'General Checkup'}\n` +
      `--------------------------------------\n` +
      `_Please confirm my consultation token at reception._`;

    window.open(`https://wa.me/${HOSPITAL_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setConfirmedBooking(null);
    setPatientName('');
    setPatientPhone('');
    setPatientAge('');
    setSymptoms('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-auto flex items-center bg-white p-1 rounded-lg shrink-0 shadow-md">
              <img
                src={HOSPITAL_INFO.logo}
                alt="Al Rehmat Hospital"
                className="h-10 w-auto object-contain rounded-sm"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold leading-tight">
                {isSubmitted ? 'Appointment Confirmation' : 'Book Specialist Appointment'}
              </h3>
              <p className="text-red-100 text-xs mt-0.5">
                Al Rehmat Hospital · Verpal Chatta, Saim Nala, Gujranwala
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> For urgent medical or pregnancy emergencies, please visit our 24/7 Emergency Ward directly or dial <strong>{HOSPITAL_INFO.phone}</strong>.
                </p>
              </div>

              {/* Department & Doctor Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Department *
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => handleDeptChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">-- Choose Department --</option>
                    {DEPARTMENTS_DATA.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Specialist Doctor *
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => handleDoctorChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.title})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctor Details Summary Banner */}
              {selectedDoctor && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{selectedDoctor.name}</span>
                    {selectedDoctor.qualification && (
                      <span className="text-slate-500 ml-2">· {selectedDoctor.qualification}</span>
                    )}
                    <div className="text-red-700 font-semibold mt-0.5">
                      Schedule: {selectedDoctor.timing}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                    {selectedDoctor.department.split('&')[0]}
                  </span>
                </div>
              )}

              {/* Patient Name & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Muhammad Ahmad / Ayesha Bibi"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g. 0319-1234567"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Age, Gender & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="115"
                    placeholder="e.g. 28"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gender
                  </label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Child / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Consultation Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Morning (10:00 AM - 01:00 PM)",
                    "Afternoon (01:00 PM - 03:00 PM)",
                    "Evening (04:00 PM - 07:00 PM)",
                    "Night OPD (07:00 PM - 09:00 PM)",
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setAppointmentTime(slot)}
                      className={`text-left text-xs p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        appointmentTime === slot
                          ? 'bg-red-50 border-red-500 text-red-900 font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span>{slot}</span>
                      <Clock className={`w-3.5 h-3.5 ${appointmentTime === slot ? 'text-red-600' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chief Medical Concern / Symptoms */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Symptoms or Health Reason (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe main symptoms, previous treatments, or reason for visit..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Confirm Token & Slip</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation Voucher View */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold font-heading text-slate-900">
                  Appointment Token Issued!
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Your consultation token has been generated. Please save or bring this slip to the reception counter.
                </p>
              </div>

              {/* Printable Appointment Slip */}
              <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-300 relative">
                {/* Hospital Header on Slip */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={HOSPITAL_INFO.logo}
                      alt="Logo"
                      className="h-10 w-auto max-w-[80px] object-contain rounded-md border border-slate-200 bg-white p-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">AL REHMAT HOSPITAL</p>
                      <p className="text-[11px] text-slate-500">OPD Consultation Token</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block bg-red-100 text-red-800 text-xs font-mono font-bold px-2.5 py-1 rounded-md">
                      {confirmedBooking?.id}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Date: {confirmedBooking?.createdAt}</p>
                  </div>
                </div>

                {/* Patient & Doctor Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 text-xs">
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Patient Name:</span>
                    <span className="font-bold text-slate-800 text-sm">{confirmedBooking?.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Contact Phone:</span>
                    <span className="font-bold text-slate-800 text-sm">{confirmedBooking?.patientPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Doctor Assigned:</span>
                    <span className="font-bold text-red-700 text-sm">{confirmedBooking?.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Specialty:</span>
                    <span className="font-medium text-slate-700">{confirmedBooking?.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Appointment Date:</span>
                    <span className="font-bold text-slate-800">{confirmedBooking?.appointmentDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold">Time Slot:</span>
                    <span className="font-bold text-slate-800">{confirmedBooking?.appointmentTime}</span>
                  </div>
                </div>

                {/* Important Instructions */}
                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                  <p>• Please arrive 15 minutes before your time slot with previous medical reports.</p>
                  <p>• Hospital Address: {HOSPITAL_INFO.address} | Phone & WhatsApp: {HOSPITAL_INFO.phone}</p>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Print */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Token to WhatsApp</span>
                </button>

                <button
                  onClick={handlePrintSlip}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
