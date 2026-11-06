import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, RotateCcw, LogOut, CheckCircle2, 
  Clock, Shield, User, Image as ImageIcon, Search,
  X, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { useDoctors } from '../context/DoctorContext';
import { Doctor } from '../types/hospital';
import { DoctorAvatar } from '../components/DoctorAvatar';

interface AdminPageProps {
  onBackToSite: () => void;
}

const COMMON_DEPARTMENTS = [
  "Gynecology & Obstetrics",
  "Pediatrics & General Medicine",
  "General Medicine & Clinical Care",
  "Urology & Kidney Care",
  "ENT (Ear, Nose, Throat)",
  "Physiotherapy & Rehabilitation",
  "Diagnostic Ultrasound & Imaging",
  "Emergency Medicine"
];

const WEEK_DAYS = [
  "Daily",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, resetDoctorsToDefault, logoutAdmin } = useDoctors();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State for Adding / Editing
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as 'male' | 'female',
    department: COMMON_DEPARTMENTS[0],
    title: '',
    qualification: '',
    timing: '',
    days: ['Daily'],
    image: '',
    experience: '',
    specialties: '',
    notes: '',
    isGoldMedalist: false,
  });

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3500);
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      gender: 'male',
      department: COMMON_DEPARTMENTS[0],
      title: 'Consultant Specialist',
      qualification: 'M.B.B.S, R.M.P',
      timing: 'Daily: 09:00 AM – 02:00 PM',
      days: ['Daily'],
      image: '',
      experience: 'Experienced clinical specialist',
      specialties: 'General Consultations, Preventive Care, Emergency Management',
      notes: 'Available for clinical outpatient consultations.',
      isGoldMedalist: false,
    });
    setEditingDoctor(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (doc: Doctor) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name,
      gender: doc.gender,
      department: doc.department,
      title: doc.title,
      qualification: doc.qualification,
      timing: doc.timing,
      days: doc.days,
      image: doc.image,
      experience: doc.experience,
      specialties: doc.specialties.join(', '),
      notes: doc.notes || '',
      isGoldMedalist: !!doc.isGoldMedalist,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    const specialtiesList = formData.specialties
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingDoctor) {
      updateDoctor(editingDoctor.id, {
        name: formData.name,
        gender: formData.gender,
        department: formData.department,
        title: formData.title,
        qualification: formData.qualification,
        timing: formData.timing,
        days: formData.days,
        image: formData.image,
        experience: formData.experience,
        specialties: specialtiesList.length > 0 ? specialtiesList : ['General Consultations'],
        notes: formData.notes,
        isGoldMedalist: formData.isGoldMedalist,
      });
      showNotification(`"${formData.name}" profile updated successfully!`);
    } else {
      addDoctor({
        name: formData.name,
        urduName: '',
        departmentUrdu: '',
        gender: formData.gender,
        department: formData.department,
        title: formData.title,
        qualification: formData.qualification,
        timing: formData.timing,
        days: formData.days,
        image: formData.image,
        experience: formData.experience,
        specialties: specialtiesList.length > 0 ? specialtiesList : ['General Consultations'],
        notes: formData.notes,
        isGoldMedalist: formData.isGoldMedalist,
      });
      showNotification(`New doctor "${formData.name}" added to roster!`);
    }

    setIsAddModalOpen(false);
    setEditingDoctor(null);
  };

  const handleDelete = (id: string, name: string) => {
    deleteDoctor(id);
    setDeleteConfirmationId(null);
    showNotification(`Doctor "${name}" was removed from the roster.`);
  };

  const handleReset = () => {
    resetDoctorsToDefault();
    setShowResetConfirm(false);
    showNotification("Doctor roster has been reset to hospital defaults.");
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.timing.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Admin Top Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-black text-lg text-white">Hospital Administration Panel</h1>
                <span className="text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full uppercase">
                  Live Management
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage doctors, consult timings, credentials & photographs</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToSite}
              className="py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
            <button
              onClick={() => {
                logoutAdmin();
                onBackToSite();
              }}
              className="py-2 px-3.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs font-bold rounded-xl border border-red-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Logout from admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Actions & Search Ribbon */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by doctor name, department, or timing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Restore original preset doctors roster"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Roster to Default</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </button>
          </div>
        </div>

        {/* Doctor Count Status */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Active Doctors Roster ({filteredDoctors.length} Doctors)
          </h2>
          <span className="text-xs text-slate-500">
            All updates instantly reflect on the public website & appointment system.
          </span>
        </div>

        {/* Doctor Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Doctor Header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <DoctorAvatar
                    gender={doc.gender}
                    image={doc.image}
                    name={doc.name}
                    className="w-16 h-16 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide block truncate">
                      {doc.department}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900 leading-snug mt-0.5 break-words">
                      {doc.name}
                    </h3>
                    {doc.qualification ? (
                      <p className="text-[11px] text-slate-500 font-medium leading-normal mt-1 break-words">
                        {doc.qualification}
                      </p>
                    ) : null}
                    {doc.isGoldMedalist && (
                      <span className="inline-block mt-1 text-[9px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                        Gold Medalist
                      </span>
                    )}
                  </div>
                </div>

                {/* Timing Badge */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2 mb-3">
                  <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="font-semibold text-slate-900">{doc.timing}</span>
                </div>

                {/* Days */}
                <div className="text-[11px] text-slate-600 mb-3 flex flex-wrap gap-1">
                  <span className="font-semibold text-slate-400">Days:</span>
                  {doc.days.map((d, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Specialties preview */}
                <div className="space-y-1 mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specialties:</span>
                  <div className="text-xs text-slate-600 line-clamp-2">
                    {doc.specialties.join(' · ')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEdit(doc)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => setDeleteConfirmationId(doc.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                  title="Delete doctor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Delete Confirmation Overlay */}
              {deleteConfirmationId === doc.id && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-3xl p-5 flex flex-col items-center justify-center text-center z-10 animate-in fade-in">
                  <AlertTriangle className="w-8 h-8 text-rose-600 mb-2" />
                  <p className="text-xs font-bold text-slate-900 mb-1">Remove Doctor?</p>
                  <p className="text-[11px] text-slate-500 mb-4 px-2">
                    Are you sure you want to remove <strong>{doc.name}</strong> from the roster?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeleteConfirmationId(null)}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id, doc.name)}
                      className="py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Yes, Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Doctor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white">
                  {editingDoctor ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <h3 className="text-base font-heading font-black text-white">
                  {editingDoctor ? `Edit: ${editingDoctor.name}` : 'Add New Hospital Doctor'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Doctor Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Doctor Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lady Dr. Ayesha Khan or Dr. Tariq Mahmood"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="male">Male Doctor</option>
                    <option value="female">Female Doctor (Lady Dr.)</option>
                  </select>
                </div>
              </div>

              {/* Department & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    list="department-suggestions"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="Select or enter department"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <datalist id="department-suggestions">
                    {COMMON_DEPARTMENTS.map((dept, idx) => (
                      <option key={idx} value={dept} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Consultant Gynecologist or Specialist Urologist"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Qualifications & Gold Medalist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Qualification Degrees (Leave blank if none)
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. M.B.B.S, F.C.P.S, M.S"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.isGoldMedalist}
                      onChange={(e) => setFormData({ ...formData, isGoldMedalist: e.target.checked })}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                    />
                    <span>Gold Medalist Badge</span>
                  </label>
                </div>
              </div>

              {/* Timings & Days */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Consultation Timing *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.timing}
                    onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                    placeholder="e.g. Daily: 09:00 AM – 02:00 PM or Wed: 10:00 AM – 01:00 PM"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Consultation Days (Comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.days.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        days: e.target.value.split(',').map((d) => d.trim()).filter(Boolean),
                      })
                    }
                    placeholder="e.g. Daily or Monday, Wednesday, Friday"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {WEEK_DAYS.map((day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => {
                          if (formData.days.includes(day)) {
                            setFormData({ ...formData, days: formData.days.filter((d) => d !== day) });
                          } else {
                            setFormData({ ...formData, days: [...formData.days, day] });
                          }
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          formData.days.includes(day)
                            ? 'bg-red-600 text-white font-bold'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Doctor Picture URL with Live Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Doctor Picture Image Link (URL)
                </label>
                <div className="flex gap-3 items-center">
                  <div className="relative flex-1">
                    <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image link, e.g. https://i.postimg.cc/..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                  {/* Live Thumbnail Preview */}
                  <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                    <DoctorAvatar
                      gender={formData.gender}
                      image={formData.image}
                      name={formData.name || 'Preview'}
                      className="w-12 h-12"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tip: If no image link is provided, a clean professional medical avatar will automatically be used.
                </p>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Key Clinical Specialties (Comma-separated) *
                </label>
                <textarea
                  rows={2}
                  value={formData.specialties}
                  onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  placeholder="e.g. Normal Delivery, Antenatal Checkups, Infertility Management"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              {/* Experience & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Experience / Hospital Background
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. Ex-Registrar Civil Hospital Gujranwala"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Administrative Notes
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Available daily with female clinical team"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingDoctor ? 'Save Doctor Changes' : 'Create Doctor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 text-center border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-black text-base text-slate-900 mb-1">Reset All Doctors?</h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              This will restore all doctor profiles, timings, and photographs to the original hospital defaults. Any custom additions or edits will be reset.
            </p>
            <div className="flex gap-2.5 justify-center">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Yes, Reset Roster
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
